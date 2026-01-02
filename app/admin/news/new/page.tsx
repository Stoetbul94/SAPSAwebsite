"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createNews } from "@/lib/firebase/firestore";
import { uploadFile, getStoragePath } from "@/lib/firebase/storage";

export default function NewNewsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imageURL: "",
    isPinned: false,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageURL = formData.imageURL;
      if (imageFile) {
        const path = getStoragePath("image", imageFile.name);
        imageURL = await uploadFile(imageFile, path);
      }

      await createNews({
        ...formData,
        imageURL,
      });

      router.push("/admin/news");
    } catch (error) {
      console.error("Error creating news:", error);
      alert("Failed to create news article");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold mb-8">New News Article</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border border-gray-200 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title *</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Content *</label>
          <textarea
            required
            rows={12}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="You can use HTML tags for formatting"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">
            HTML is supported. Use &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, etc.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {formData.imageURL && !imageFile && (
            <p className="text-sm text-gray-500 mt-1">Current: {formData.imageURL}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isPinned"
            checked={formData.isPinned}
            onChange={(e) => setFormData({ ...formData, isPinned: e.target.checked })}
            className="w-4 h-4"
          />
          <label htmlFor="isPinned" className="text-sm">
            Pin to top
          </label>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Article"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
