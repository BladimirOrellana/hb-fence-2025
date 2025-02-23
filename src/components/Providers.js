"use client"; // ✅ Ensures this runs only in the client

import { UserProvider } from "@/context/UserContext";
import ThemeRegistry from "@/utils/themeRegistry";
import SEOProvider from "@/components/SEOProvider"; // ✅ Import the new SEO Component

export default function Providers({ children }) {
  return (
    <UserProvider>
      <ThemeRegistry>
        <SEOProvider /> {/* ✅ DefaultSeo is now inside a Client Component */}
        {children}
      </ThemeRegistry>
    </UserProvider>
  );
}
