"use client"; // ✅ Client Component for image uploads

import { useState } from "react";
import { Button, LinearProgress } from "@mui/material";

export default function ImageUploader({ onUploadComplete }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.url) {
        onUploadComplete(data.url); // ✅ Pass image URL to parent component
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }

    setUploading(false);
    setProgress(100);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={uploading}
        style={{ display: "none" }}
        id="upload-button"
      />
      <label htmlFor="upload-button">
        <Button variant="contained" component="span" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload Image"}
        </Button>
      </label>
      {uploading && <LinearProgress variant="determinate" value={progress} />}
    </div>
  );
}
