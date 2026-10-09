// The fallback is the production host on purpose. It used to be the
// `floyd-labs-proving-ground.vercel.app` preview alias, which sits behind Vercel
// SSO — so every build that did not set NEXT_PUBLIC_SITE_URL published a
// canonical host, a sitemap, a robots.txt Sitemap directive, and an og:image URL
// that all pointed at a login wall. Production is www: floydslabs.com answers
// with a 307 to www.floydslabs.com, and that is the host this app already uses
// for its connect and admin redirects.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.floydslabs.com").replace(/\/$/, "");
export const isPreviewDeployment = process.env.VERCEL_ENV === "preview";
