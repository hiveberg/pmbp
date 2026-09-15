export function getClientIp(headers: Headers) {
  const direct = headers.get('cf-connecting-ip');
  if (direct) return direct;
  const forwarded = headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return forwarded || undefined;
}

export async function hashClientIp(ip: string | undefined, salt = '') {
  if (!ip) return undefined;
  const value = new TextEncoder().encode(`${salt}:${ip}`);
  const digest = await crypto.subtle.digest('SHA-256', value);
  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}
