import { mkdirSync, writeFileSync } from "node:fs";

const siteUrl = normalizeSiteUrl(process.env.VITE_SITE_URL || "https://your-domain.com");
const buildDate = new Date().toISOString().split("T")[0];

mkdirSync("public", { recursive: true });

const robots = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${siteUrl}/</loc>\n    <lastmod>${buildDate}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>\n`;

writeFileSync("public/robots.txt", robots);
writeFileSync("public/sitemap.xml", sitemap);

console.log(`Generated robots.txt and sitemap.xml for ${siteUrl}`);

function normalizeSiteUrl(url) {
  return url.trim().replace(/\/$/, "");
}
