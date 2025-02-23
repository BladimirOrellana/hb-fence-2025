"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

export default function AdminPage() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      router.push("/"); // Redirect if not admin
    }
  }, [user, loading, router]);

  if (loading) return <p>Loading...</p>;

  return <h1>Admin Dashboard</h1>;
}
