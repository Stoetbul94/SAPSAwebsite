"use client";

import { useEffect, useState } from "react";
import { getNews, deleteNews, News } from "@/lib/firebase/firestore";
import { format } from "date-fns";
import { Plus, Edit, Trash2, Pin, PinOff } from "lucide-react";
import Link from "next/link";

export default function AdminNewsPage() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNews();
  }, []);

  async function loadNews() {
    try {
      const data = await getNews();
      setNews(data);
    } catch (error) {
      console.error("Error loading news:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this news article?")) return;
    try {
      await deleteNews(id);
      setNews(news.filter((n) => n.id !== id));
    } catch (error) {
      console.error("Error deleting news:", error);
      alert("Failed to delete news article");
    }
  }

  if (loading) {
    return <p>Loading news...</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-heading text-3xl font-bold">News</h1>
        <Link
          href="/admin/news/new"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          New Article
        </Link>
      </div>

      {news.length === 0 ? (
        <p className="text-gray-500">No news articles found.</p>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Title</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Published</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {news.map((article) => (
                <tr key={article.id}>
                  <td className="px-4 py-3">{article.title}</td>
                  <td className="px-4 py-3">
                    {format(article.publishedAt.toDate(), "MMM d, yyyy")}
                  </td>
                  <td className="px-4 py-3">
                    {article.isPinned ? (
                      <span className="flex items-center gap-1 text-accent">
                        <Pin size={16} />
                        Pinned
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-gray-500">
                        <PinOff size={16} />
                        Normal
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/news/${article.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        <Edit size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="text-red-600 hover:underline"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
