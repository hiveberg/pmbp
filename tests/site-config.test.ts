import { describe, expect, it } from 'vitest';
import { buildSiteConfig, SUPPORT_PHONE_HREF } from '@/lib/site-config';

describe('site configuration', () => {
  it('uses the configured GitHub URL for CTAs and releases', () => {
    const config = buildSiteConfig({
      NEXT_PUBLIC_PMBP_GITHUB_URL: 'https://github.com/example/pmbp',
    });

    expect(config.githubHref).toBe('https://github.com/example/pmbp');
    expect(config.downloadHref).toBe(
      'https://github.com/example/pmbp/releases',
    );
  });

  it('uses the exact support phone link', () => {
    expect(SUPPORT_PHONE_HREF).toBe('tel:+48796073632');
  });
});
