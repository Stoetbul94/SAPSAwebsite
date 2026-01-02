"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getNewsArticle, updateNews } from "@/lib/firebase/firestore";
import { uploadFile, getStoragePath } from "@/lib/firebase/storage";
import { News } from "@/lib/firebase/firestore";

export default function EditNewsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<News>>({
    title: "",
    content: "",
    imageURL: "",
    isPinned: false,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    async function loadNews() {
      try {
        const article = await getNewsArticle(params.id);
        if (article) {
          setFormData({
            title: article.title,
            content: article.content,
            imageURL: article.imageURL,
            isPinned: article.isPinned,
          });
        }
      } catch (error) {
        console.error("Error loading news:", error);
      } finally {
        setLoading(false);
      }
    }
    loadNews();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      let imageURL = formData.imageURL;
      if (imageFile) {
        const path = getStoragePath("image", imageFile.name);
        imageURL = await uploadFile(imageFile, path);
      }

      await updateNews(params.id, {
        ...formData,
        imageURL,
      });

      router.push("/admin/news");
    } catch (error) {
      console.error("Error updating news:", error);
      alert("Failed to update news article");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p>Loading article...</p>;
  }

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold mb-8">Edit News Article</h1>

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
            disabled={saving}
            className="bg-primary text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
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
