export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://floyd-labs-proving-ground.vercel.app").replace(/\/$/, "");
export const isPreviewDeployment = process.env.VERCEL_ENV === "preview";
