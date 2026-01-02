"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logoutAdmin } from "@/lib/firebase/auth";
import { LogOut, Home } from "lucide-react";

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAdmin();
    router.push("/admin/login");
  };

  const navItems = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/events", label: "Events" },
    { href: "/admin/results", label: "Results" },
    { href: "/admin/news", label: "News" },
    { href: "/admin/documents", label: "Documents" },
    { href: "/admin/media", label: "Media" },
    { href: "/admin/users", label: "Users" },
  ];

  return (
    <nav className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link href="/admin" className="text-xl font-heading font-bold">
              SAPSA Admin
            </Link>
            <div className="hidden md:flex space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`hover:text-accent transition-colors ${
                    pathname === item.href ? "text-accent" : ""
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="hover:text-accent transition-colors flex items-center gap-1"
            >
              <Home size={18} />
              <span className="hidden sm:inline">Public Site</span>
            </Link>
            <button
              onClick={handleLogout}
              className="hover:text-accent transition-colors flex items-center gap-1"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
