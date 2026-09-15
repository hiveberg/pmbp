declare namespace Cloudflare {
  interface Env {
    DB: D1Database;
    DEMO_NOTIFICATION_EMAIL_1?: string;
    DEMO_NOTIFICATION_EMAIL_2?: string;
    DEMO_NOTIFICATION_EMAILS?: string;
    EMAIL_FROM?: string;
    RESEND_API_KEY?: string;
    RATE_LIMIT_SALT?: string;
  }
}
