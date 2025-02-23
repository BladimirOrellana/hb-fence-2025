"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        console.warn("⚠️ No Firebase user, setting user to null.");
        setUser(null);
        setLoading(false);
        return;
      }

      console.log("🔍 Firebase user detected:", firebaseUser.uid);

      try {
        const mongoUser = await fetchUserData(firebaseUser.uid);

        if (!mongoUser) {
          console.warn("⚠️ User not found in MongoDB, keeping Firebase user.");
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            firstName: "",
            lastName: "",
            profileImage: "",
            role: "user",
            createdAt: firebaseUser.metadata.creationTime,
          });
        } else {
          console.log("✅ Setting user from MongoDB:", mongoUser);
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            firstName: mongoUser?.firstName || "",
            lastName: mongoUser?.lastName || "",
            profileImage: mongoUser?.profileImage || "",
            role: mongoUser?.role || "user",
            createdAt:
              mongoUser?.createdAt || firebaseUser.metadata.creationTime,
          });
        }
      } catch (error) {
        console.error("❌ Error fetching user data from MongoDB:", error);
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const fetchUserData = async (uid) => {
    try {
      const res = await fetch(`/api/getUser?uid=${uid}`);
      if (!res.ok) {
        console.warn("User not found in MongoDB");
        return null;
      }
      return await res.json();
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook to use user context
export function useUser() {
  return useContext(UserContext);
}
