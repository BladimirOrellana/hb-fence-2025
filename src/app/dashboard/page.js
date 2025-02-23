"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { Button, Container, Typography, Box } from "@mui/material";

export default function DashboardPage() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) return <p>Loading...</p>;

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4">Welcome, {user?.firstName}!</Typography>
        <Typography variant="body1">Role: {user?.role}</Typography>
        <Button href="/profile" variant="contained" sx={{ mt: 2 }}>
          Go to Profile
        </Button>
        {user?.role === "admin" && (
          <Button href="/admin" variant="contained" sx={{ mt: 2, ml: 2 }}>
            Go to Admin Panel
          </Button>
        )}
      </Box>
    </Container>
  );
}
