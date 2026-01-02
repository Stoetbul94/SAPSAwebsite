"use client";

import { useEffect, useState } from "react";
import { getResults, deleteResult, createResult, Result } from "@/lib/firebase/firestore";
import { format } from "date-fns";
import { Plus, Trash2, Upload } from "lucide-react";
import { uploadFile, getStoragePath } from "@/lib/firebase/storage";

export default function AdminResultsPage() {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    eventId: "",
    year: new Date().getFullYear(),
    pdfURL: "",
  });
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadResults();
  }, []);

  async function loadResults() {
    try {
      const data = await getResults();
      setResults(data);
    } catch (error) {
      console.error("Error loading results:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setUploading(true);

    try {
      let pdfURL = formData.pdfURL;
      if (pdfFile) {
        const path = getStoragePath("pdf", pdfFile.name);
        pdfURL = await uploadFile(pdfFile, path);
      }

      await createResult({
        eventId: formData.eventId,
        year: formData.year,
        pdfURL,
      });

      setFormData({ eventId: "", year: new Date().getFullYear(), pdfURL: "" });
      setPdfFile(null);
      setShowForm(false);
      loadResults();
    } catch (error) {
      console.error("Error creating result:", error);
      alert("Failed to upload result");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this result?")) return;
    try {
      await deleteResult(id);
      setResults(results.filter((r) => r.id !== id));
    } catch (error) {
      console.error("Error deleting result:", error);
      alert("Failed to delete result");
    }
  }

  if (loading) {
    return <p>Loading results...</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-heading text-3xl font-bold">Results</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Upload Result
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
          <h2 className="font-heading text-xl font-bold mb-4">Upload New Result</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Event ID *</label>
              <input
                type="text"
                required
                value={formData.eventId}
                onChange={(e) => setFormData({ ...formData, eventId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Year *</label>
              <input
                type="number"
                required
                value={formData.year}
                onChange={(e) =>
                  setFormData({ ...formData, year: parseInt(e.target.value) })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">PDF File *</label>
              <input
                type="file"
                accept=".pdf"
                required
                onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={uploading}
                className="bg-primary text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                <Upload size={18} />
                {uploading ? "Uploading..." : "Upload"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setFormData({ eventId: "", year: new Date().getFullYear(), pdfURL: "" });
                  setPdfFile(null);
                }}
                className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {results.length === 0 ? (
        <p className="text-gray-500">No results found.</p>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Event ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Year</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Published</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {results.map((result) => (
                <tr key={result.id}>
                  <td className="px-4 py-3">{result.eventId}</td>
                  <td className="px-4 py-3">{result.year}</td>
                  <td className="px-4 py-3">
                    {format(result.publishedAt.toDate(), "MMM d, yyyy")}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <a
                        href={result.pdfURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </a>
                      <button
                        onClick={() => handleDelete(result.id)}
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
