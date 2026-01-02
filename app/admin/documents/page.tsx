"use client";

import { useEffect, useState } from "react";
import { getDocuments, deleteDocument, createDocument, Document } from "@/lib/firebase/firestore";
import { format } from "date-fns";
import { Plus, Trash2, Upload } from "lucide-react";
import { uploadFile, getStoragePath } from "@/lib/firebase/storage";

export default function AdminDocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "Rules" as "Rules" | "Policies" | "Governance",
    pdfURL: "",
  });
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadDocuments();
  }, []);

  async function loadDocuments() {
    try {
      const data = await getDocuments();
      setDocuments(data);
    } catch (error) {
      console.error("Error loading documents:", error);
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

      await createDocument({
        title: formData.title,
        category: formData.category,
        pdfURL,
      });

      setFormData({ title: "", category: "Rules", pdfURL: "" });
      setPdfFile(null);
      setShowForm(false);
      loadDocuments();
    } catch (error) {
      console.error("Error creating document:", error);
      alert("Failed to upload document");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this document?")) return;
    try {
      await deleteDocument(id);
      setDocuments(documents.filter((d) => d.id !== id));
    } catch (error) {
      console.error("Error deleting document:", error);
      alert("Failed to delete document");
    }
  }

  if (loading) {
    return <p>Loading documents...</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-heading text-3xl font-bold">Documents</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Upload Document
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
          <h2 className="font-heading text-xl font-bold mb-4">Upload New Document</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
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
              <label className="block text-sm font-medium mb-1">Category *</label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as "Rules" | "Policies" | "Governance",
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Rules">Rules</option>
                <option value="Policies">Policies</option>
                <option value="Governance">Governance</option>
              </select>
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
                  setFormData({ title: "", category: "Rules", pdfURL: "" });
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

      {documents.length === 0 ? (
        <p className="text-gray-500">No documents found.</p>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Title</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Category</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Updated</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {documents.map((document) => (
                <tr key={document.id}>
                  <td className="px-4 py-3">{document.title}</td>
                  <td className="px-4 py-3">{document.category}</td>
                  <td className="px-4 py-3">
                    {format(document.updatedAt.toDate(), "MMM d, yyyy")}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <a
                        href={document.pdfURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </a>
                      <button
                        onClick={() => handleDelete(document.id)}
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
