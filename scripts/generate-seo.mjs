import { mkdirSync, writeFileSync } from "node:fs";

const siteUrl = normalizeSiteUrl(process.env.VITE_SITE_URL || "https://your-domain.com");
const buildDate = new Date().toISOString().split("T")[0];
const pages = [
  "/",
  "/merge-selected-pdf-pages-online/",
  "/merge-odd-even-pdf-pages/",
  "/private-pdf-merger-no-upload/"
];

mkdirSync("public", { recursive: true });

const robots = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
const urls = pages
  .map(
    (path) =>
      `  <url>\n    <loc>${siteUrl}${path}</loc>\n    <lastmod>${buildDate}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${path === "/" ? "1.0" : "0.8"}</priority>\n  </url>`
  )
  .join("\n");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

writeFileSync("public/robots.txt", robots);
writeFileSync("public/sitemap.xml", sitemap);

console.log(`Generated robots.txt and sitemap.xml for ${siteUrl}`);

function normalizeSiteUrl(url) {
  return url.trim().replace(/\/$/, "");
}
