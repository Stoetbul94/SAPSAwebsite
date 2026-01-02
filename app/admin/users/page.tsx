"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, setDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Plus, Trash2 } from "lucide-react";

export default function AdminUsersPage() {
  const [admins, setAdmins] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [newEmail, setNewEmail] = useState("");
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    loadAdmins();
  }, []);

  async function loadAdmins() {
    try {
      const snapshot = await getDocs(collection(db, "admins"));
      const emails = snapshot.docs.map((doc) => doc.id).filter(Boolean);
      setAdmins(emails);
    } catch (error) {
      console.error("Error loading admins:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd() {
    if (!newEmail.trim()) return;
    setAdding(true);

    try {
      const adminRef = doc(db, "admins", newEmail.trim());
      await setDoc(adminRef, { 
        email: newEmail.trim(), 
        createdAt: serverTimestamp() 
      });
      
      setNewEmail("");
      loadAdmins();
    } catch (error) {
      console.error("Error adding admin:", error);
      alert("Failed to add admin");
    } finally {
      setAdding(false);
    }
  }

  async function handleDelete(email: string) {
    if (!confirm(`Are you sure you want to remove ${email} as an admin?`)) return;
    try {
      const adminRef = doc(db, "admins", email);
      await deleteDoc(adminRef);
      setAdmins(admins.filter((e) => e !== email));
    } catch (error) {
      console.error("Error deleting admin:", error);
      alert("Failed to remove admin");
    }
  }

  if (loading) {
    return <p>Loading admins...</p>;
  }

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold mb-8">Admin Users</h1>

      <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
        <h2 className="font-heading text-xl font-bold mb-4">Add Admin</h2>
        <div className="flex gap-4">
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="admin@example.com"
            className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={handleAdd}
            disabled={adding || !newEmail.trim()}
            className="bg-primary text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            <Plus size={20} />
            {adding ? "Adding..." : "Add"}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {admins.length === 0 ? (
              <tr>
                <td colSpan={2} className="px-4 py-3 text-gray-500 text-center">
                  No admins found.
                </td>
              </tr>
            ) : (
              admins.map((email) => (
                <tr key={email}>
                  <td className="px-4 py-3">{email}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDelete(email)}
                      className="text-red-600 hover:underline flex items-center gap-1"
                    >
                      <Trash2 size={18} />
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
