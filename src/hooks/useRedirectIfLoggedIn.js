"use client"; // ✅ Ensure this is a client hook

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/utils/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function useRedirectIfLoggedIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isRedirecting, setIsRedirecting] = useState(false); // Prevents extra re-renders

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsRedirecting(true);
        router.push("/dashboard");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  return isRedirecting || loading; // ✅ Return a boolean value instead of JSX
}
