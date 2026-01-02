"use client";

import { useState } from "react";
import { uploadFile, getStoragePath } from "@/lib/firebase/storage";
import { Upload, Image as ImageIcon } from "lucide-react";

export default function AdminMediaPage() {
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadedUrl("");

    try {
      const path = getStoragePath("image", file.name);
      const url = await uploadFile(file, path);
      setUploadedUrl(url);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold mb-8">Media Library</h1>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="font-heading text-xl font-bold mb-4">Upload Image</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Select Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
          />
        </div>

        {uploading && <p className="text-gray-600">Uploading...</p>}

        {uploadedUrl && (
          <div className="mt-4 p-4 bg-gray-50 rounded">
            <p className="text-sm font-medium mb-2">Uploaded successfully!</p>
            <div className="flex items-center gap-4">
              <div className="w-32 h-32 bg-gray-200 rounded overflow-hidden">
                <img
                  src={uploadedUrl}
                  alt="Uploaded"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium mb-1">URL:</p>
                <input
                  type="text"
                  value={uploadedUrl}
                  readOnly
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm font-mono"
                  onClick={(e) => (e.target as HTMLInputElement).select()}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Click to select, then copy (Ctrl+C)
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 p-4 bg-blue-50 rounded">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Upload images here and copy the URL to use in events,
            news articles, or other content. Images are stored in Firebase Storage.
          </p>
        </div>
      </div>
    </div>
  );
}
