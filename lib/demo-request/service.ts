import type {
  DemoRequestLogger,
  DemoRequestRepository,
  NewDemoRequest,
  StoredDemoRequest,
} from './types';

export class DemoRequestRateLimitError extends Error {
  constructor() {
    super('Zbyt wiele zgłoszeń. Spróbuj ponownie później.');
    this.name = 'DemoRequestRateLimitError';
  }
}

type ServiceDependencies = {
  repository: DemoRequestRepository;
  sendNotification: (request: StoredDemoRequest) => Promise<void>;
  logger: DemoRequestLogger;
  now?: () => Date;
};

function safeErrorName(error: unknown) {
  return error instanceof Error ? error.name : 'UnknownError';
}

function safeErrorReason(error: unknown) {
  if (!(error instanceof Error)) return 'UnknownError';
  return `${error.name}: ${error.message}`.slice(0, 240);
}

async function recordNotificationFailure(
  requestId: string,
  error: unknown,
  dependencies: ServiceDependencies,
) {
  dependencies.logger.error({
    category: 'EMAIL_DELIVERY',
    demoRequestId: requestId,
    errorName: safeErrorName(error),
  });

  try {
    await dependencies.repository.markNotificationFailed(
      requestId,
      safeErrorReason(error),
    );
  } catch (statusError) {
    dependencies.logger.error({
      category: 'NOTIFICATION_STATUS_UPDATE',
      demoRequestId: requestId,
      errorName: safeErrorName(statusError),
    });
  }
}

async function notifySavedRequest(
  request: StoredDemoRequest,
  dependencies: ServiceDependencies,
) {
  try {
    await dependencies.sendNotification(request);
  } catch (error) {
    await recordNotificationFailure(request.id, error, dependencies);
    return;
  }

  try {
    await dependencies.repository.markNotificationSent(
      request.id,
      (dependencies.now ?? (() => new Date()))(),
    );
  } catch (error) {
    dependencies.logger.error({
      category: 'NOTIFICATION_STATUS_UPDATE',
      demoRequestId: request.id,
      errorName: safeErrorName(error),
    });
  }
}

export async function submitDemoRequest(
  input: NewDemoRequest,
  dependencies: ServiceDependencies,
) {
  if (input.ipHash) {
    const now = (dependencies.now ?? (() => new Date()))();
    const since = new Date(now.getTime() - 15 * 60 * 1000);
    const recentCount = await dependencies.repository.countRecentByIpHash(
      input.ipHash,
      since,
    );
    if (recentCount >= 5) throw new DemoRequestRateLimitError();
  }

  // The durable database record is deliberately created before any e-mail call.
  const savedRequest = await dependencies.repository.create(input);
  await notifySavedRequest(savedRequest, dependencies);
  return savedRequest;
}

export async function retryDemoRequestNotification(
  requestId: string,
  dependencies: ServiceDependencies,
) {
  const request = await dependencies.repository.findById(requestId);
  if (!request || request.notificationStatus === 'SENT') return request;
  await notifySavedRequest(request, dependencies);
  return request;
}
