import type { MetadataRoute } from "next";
import { siteUrl, isPreviewDeployment } from "@/lib/deployment";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: isPreviewDeployment
      ? { userAgent: "*", disallow: "/" }
      : { userAgent: "*", allow: "/", disallow: "/admin" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
