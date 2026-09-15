interface WebMcpToolDefinition {
  name: string;
  title?: string;
  description: string;
  inputSchema: object;
  annotations?: {
    readOnlyHint?: boolean;
    untrustedContentHint?: boolean;
  };
  execute(input: unknown): Promise<unknown> | void;
}

interface ModelContext {
  registerTool(
    tool: WebMcpToolDefinition,
    options?: { signal?: AbortSignal },
  ): void | Promise<void>;
}

interface Document {
  readonly modelContext?: ModelContext;
}
