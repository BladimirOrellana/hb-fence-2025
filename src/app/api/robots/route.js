export async function GET() {
  return new Response(
    `User-agent: *
Allow: /
Sitemap: https://www.parcelmint.com/api/sitemap`,
    { status: 200, headers: { "Content-Type": "text/plain" } }
  );
}
