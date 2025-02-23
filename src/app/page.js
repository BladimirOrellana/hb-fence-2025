"use client";

import { Box, Button, Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import Image from "next/image";
import hbImage from "@/assets/images/hb-fence.webp"; // Ensure the path is correct

export default function HomePage() {
  const router = useRouter();

  return (
    <Box
      sx={{
        height: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      {/* ✅ Background Image (Properly Using `next/image`) */}
      <Image
        src={hbImage}
        alt="HB Fence Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
      />

      {/* ✅ Dark Overlay for Better Text Visibility */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.6)", // Dark overlay
          zIndex: 1,
        }}
      />

      {/* ✅ Call to Action Content */}
      <Container
        sx={{
          position: "relative",
          zIndex: 2,
          color: "white",
          textAlign: "center",
        }}
      >
        <Typography variant="h2" fontWeight="bold" gutterBottom>
          Secure Your Property with HB Fence
        </Typography>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Get high-quality, durable fencing solutions for your home or business.
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: "limegreen",
            color: "white",
            "&:hover": { backgroundColor: "#228B22" },
          }}
          onClick={() => router.push("/contact")}
        >
          Get a Free Quote
        </Button>
      </Container>
    </Box>
  );
}
