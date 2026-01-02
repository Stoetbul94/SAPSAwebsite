"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, isFirebaseConfigured } from "@/lib/firebase/config";
import { isAdminUser } from "@/lib/firebase/auth";

export function AdminAuth({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if Firebase is configured
    if (!isFirebaseConfigured()) {
      setLoading(false);
      return;
    }

    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const admin = await isAdminUser(currentUser.email || "");
        if (admin) {
          setUser(currentUser);
          setIsAdmin(true);
        } else {
          await auth.signOut();
          router.push("/");
        }
      } else {
        setUser(null);
        setIsAdmin(false);
        router.push("/admin/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // Show message if Firebase is not configured
  if (!isFirebaseConfigured()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="font-heading text-2xl font-bold mb-4">
            Firebase Not Configured
          </h1>
          <p className="text-gray-600 mb-4">
            Firebase is required for admin features. Please configure your
            Firebase credentials in <code className="bg-gray-100 px-2 py-1 rounded">.env.local</code>
          </p>
          <p className="text-sm text-gray-500">
            See <code className="bg-gray-100 px-2 py-1 rounded">SETUP.md</code> for instructions.
          </p>
        </div>
      </div>
    );
  }

  if (!auth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Firebase Auth is not available.</p>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return <>{children}</>;
}
