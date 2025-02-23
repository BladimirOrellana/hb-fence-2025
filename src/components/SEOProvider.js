"use client"; // ✅ Ensures this runs only in the client

import { DefaultSeo } from "next-seo";

export default function SEOProvider() {
  return (
    <DefaultSeo
      title="HB Fence - Expert Fence Installation & Repairs"
      description="HB Fence provides high-quality fence installation and repair services in Houston and surrounding areas."
      openGraph={{
        title: "HB Fence - Expert Fence Installation & Repairs",
        description:
          "HB Fence specializes in residential and commercial fencing solutions, offering durable materials and expert craftsmanship.",
        url: "https://www.hbfencecompany.com",
        type: "website",
        images: [
          {
            url: "https://www.hbfencecompany.com/og-image.jpg", // Update this with a real image URL
            width: 1200,
            height: 630,
            alt: "HB Fence Logo",
          },
        ],
      }}
      twitter={{
        card: "summary_large_image",
        title: "HB Fence - Expert Fence Installation & Repairs",
        description:
          "Providing high-quality fence installation, repair, and custom fencing solutions in Houston and nearby areas.",
        images: ["https://www.hbfencecompany.com/og-image.jpg"], // Update this with a real image URL
      }}
    />
  );
}
