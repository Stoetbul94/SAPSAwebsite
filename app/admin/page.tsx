"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getEvents, getNews, getResults, getDocuments } from "@/lib/firebase/firestore";
import { Event, News, Result, Document } from "@/lib/firebase/firestore";
import { Calendar, FileText, Newspaper, Trophy } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    events: 0,
    publishedEvents: 0,
    news: 0,
    results: 0,
    documents: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [events, publishedEvents, news, results, documents] = await Promise.all([
          getEvents(false),
          getEvents(true),
          getNews(),
          getResults(),
          getDocuments(),
        ]);

        setStats({
          events: events.length,
          publishedEvents: publishedEvents.length,
          news: news.length,
          results: results.length,
          documents: documents.length,
        });
      } catch (error) {
        console.error("Error loading stats:", error);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Events</p>
              <p className="text-2xl font-bold">{stats.events}</p>
              <p className="text-sm text-gray-500">
                {stats.publishedEvents} published
              </p>
            </div>
            <Calendar className="text-accent" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">News Articles</p>
              <p className="text-2xl font-bold">{stats.news}</p>
            </div>
            <Newspaper className="text-accent" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Results</p>
              <p className="text-2xl font-bold">{stats.results}</p>
            </div>
            <Trophy className="text-accent" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Documents</p>
              <p className="text-2xl font-bold">{stats.documents}</p>
            </div>
            <FileText className="text-accent" size={32} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="font-heading text-xl font-bold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <Link
              href="/admin/events"
              className="block w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded transition-colors"
            >
              Manage Events
            </Link>
            <Link
              href="/admin/news"
              className="block w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded transition-colors"
            >
              Manage News
            </Link>
            <Link
              href="/admin/results"
              className="block w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded transition-colors"
            >
              Upload Results
            </Link>
            <Link
              href="/admin/documents"
              className="block w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded transition-colors"
            >
              Manage Documents
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="font-heading text-xl font-bold mb-4">System</h2>
          <div className="space-y-2">
            <Link
              href="/admin/media"
              className="block w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded transition-colors"
            >
              Media Library
            </Link>
            <Link
              href="/admin/users"
              className="block w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded transition-colors"
            >
              Manage Admins
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
