/**
 * Canonical origin used for metadataBase, canonical links, Open Graph URLs,
 * robots.txt and the sitemap.
 *
 * Production serves on https://www.getnutria.com and https://getnutria.com
 * issues a 307 redirect to it, so the www host is the canonical origin:
 * canonical URLs point at the final production URL rather than a redirect.
 * Everything that emits an absolute URL derives from this value.
 */
export const SITE_URL = "https://www.getnutria.com";
