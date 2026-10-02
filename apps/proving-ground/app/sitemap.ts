import type { MetadataRoute } from "next";
import { posts } from "@/lib/site-data";
import { siteUrl as base } from "@/lib/deployment";
export default function sitemap():MetadataRoute.Sitemap{return ["", "/about", "/tools", "/connect", "/blog", "/apps", "/open-source", "/contact", "/api-docs", "/privacy", "/terms", ...posts.map(p=>`/blog/${p.slug}`)].map(path=>({url:base+path,changeFrequency:path==="/open-source"?"weekly":"monthly",priority:path===""?1:.7}));}
