"use client"; // ✅ Ensures this is a Client Component

import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext"; // ✅ Custom hook for user data
import { useRouter } from "next/navigation";
import {
  TextField,
  Button,
  Container,
  Typography,
  Avatar,
  Box,
  CircularProgress,
} from "@mui/material";

export default function ProfilePage() {
  const { user, loading } = useUser(); // ✅ Only call useUser inside a Client Component
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("/default-avatar.png");
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setPreviewImage(user.profileImage || "/default-avatar.png");
    }
  }, [user, loading, router]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      console.log("Uploading file:", file.name);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Upload Response:", data);

      if (data.url) {
        setImage(data.url); // ✅ Store Cloudinary URL instead of file
      } else {
        console.error("Upload failed:", data.error);
      }
    } catch (error) {
      console.error("Upload error:", error);
    }

    setUploading(false);
  };

  const handleSave = async () => {
    console.log("Saving Profile...");
    console.log("User ID:", user.uid);
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Profile Image URL:", image);

    const formData = new FormData();
    formData.append("uid", user.uid);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    if (image) formData.append("profileImage", image);

    try {
      const res = await fetch("/api/updateUser", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const responseData = await res.json();
      console.log("Response from server:", responseData);

      alert("Profile updated successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile.");
    }
  };

  if (loading)
    return (
      <CircularProgress sx={{ display: "block", margin: "auto", mt: 5 }} />
    );

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h4">My Profile</Typography>
        <Avatar
          src={previewImage}
          sx={{ width: 100, height: 100, margin: "auto" }}
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {uploading && <CircularProgress sx={{ mt: 2 }} />}
        <TextField
          fullWidth
          label="First Name"
          variant="outlined"
          margin="normal"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          fullWidth
          label="Last Name"
          variant="outlined"
          margin="normal"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSave}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Save Changes"}
        </Button>
      </Box>
    </Container>
  );
}
