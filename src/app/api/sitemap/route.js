import { connectToDatabase } from "@/utils/db";
import Property from "@/models/Property";

export async function GET() {
  await connectToDatabase();

  // Fetch all properties from MongoDB
  const properties = await Property.find({}, "slug");

  const staticPages = ["/", "/login", "/signup", "/profile", "/marketplace"];

  // Convert properties to URLs
  const dynamicPages = properties.map(
    (property) => `/property/${property.slug}`
  );

  const pages = [...staticPages, ...dynamicPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map(
          (page) => `
        <url>
          <loc>https://www.parcelmint.com${page}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>`
        )
        .join("")}
    </urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: { "Content-Type": "application/xml" },
  });
}
