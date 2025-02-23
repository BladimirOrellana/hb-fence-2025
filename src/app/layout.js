import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers"; // ✅ Import the fixed Providers.js

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Providers>
          {" "}
          {/* ✅ Now includes SEOProvider inside a Client Component */}
          <header>
            <Navbar />
          </header>
          <main>{children}</main>
          <footer>
            <p>&copy; {new Date().getFullYear()} HB Fence LLc.</p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
