export const SUPPORT_PHONE_DISPLAY = '796 073 632';
export const SUPPORT_PHONE_HREF = 'tel:+48796073632';

function isHttpUrl(value: string | undefined): value is string {
  if (!value) return false;

  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

export function buildSiteConfig(env: Record<string, string | undefined>) {
  const githubUrl = isHttpUrl(env.NEXT_PUBLIC_PMBP_GITHUB_URL)
    ? env.NEXT_PUBLIC_PMBP_GITHUB_URL
    : undefined;
  const downloadUrl = isHttpUrl(env.NEXT_PUBLIC_PMBP_DOWNLOAD_URL)
    ? env.NEXT_PUBLIC_PMBP_DOWNLOAD_URL
    : githubUrl
      ? `${githubUrl.replace(/\/$/, '')}/releases`
      : undefined;

  return {
    siteUrl: isHttpUrl(env.NEXT_PUBLIC_SITE_URL)
      ? env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '')
      : 'https://www.pmbp.pl',
    githubUrl,
    githubHref: githubUrl || '#open-source',
    downloadUrl,
    downloadHref: downloadUrl || '#open-source',
    docsHref: githubUrl
      ? `${githubUrl.replace(/\/$/, '')}#readme`
      : '#open-source',
    supportPhoneDisplay: SUPPORT_PHONE_DISPLAY,
    supportPhoneHref: SUPPORT_PHONE_HREF,
  };
}

export const siteConfig = buildSiteConfig({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_PMBP_GITHUB_URL: process.env.NEXT_PUBLIC_PMBP_GITHUB_URL,
  NEXT_PUBLIC_PMBP_DOWNLOAD_URL: process.env.NEXT_PUBLIC_PMBP_DOWNLOAD_URL,
});
