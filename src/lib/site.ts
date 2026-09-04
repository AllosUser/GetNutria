/**
 * Canonical origin used for metadataBase, canonical links, Open Graph URLs,
 * robots.txt and the sitemap.
 *
 * NOTE: production currently serves on https://www.getnutria.com and
 * https://getnutria.com issues a 307 redirect to it. This constant keeps the
 * apex origin already used elsewhere in the site metadata. If the www host is
 * the intended canonical origin, change this single value — everything that
 * emits an absolute URL derives from it.
 */
export const SITE_URL = "https://getnutria.com";
