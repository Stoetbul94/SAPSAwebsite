"use client";

import { useEffect, useState } from "react";
import { getEvents, deleteEvent, Event } from "@/lib/firebase/firestore";
import { format } from "date-fns";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    try {
      const data = await getEvents(false);
      setEvents(data);
    } catch (error) {
      console.error("Error loading events:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      await deleteEvent(id);
      setEvents(events.filter((e) => e.id !== id));
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event");
    }
  }

  if (loading) {
    return <p>Loading events...</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-heading text-3xl font-bold">Events</h1>
        <Link
          href="/admin/events/new"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          New Event
        </Link>
      </div>

      {events.length === 0 ? (
        <p className="text-gray-500">No events found.</p>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Title</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Location</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {events.map((event) => (
                <tr key={event.id}>
                  <td className="px-4 py-3">{event.title}</td>
                  <td className="px-4 py-3">
                    {format(new Date(event.date), "MMM d, yyyy")}
                  </td>
                  <td className="px-4 py-3">{event.location}</td>
                  <td className="px-4 py-3">
                    {event.isPublished ? (
                      <span className="flex items-center gap-1 text-green-600">
                        <Eye size={16} />
                        Published
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-gray-500">
                        <EyeOff size={16} />
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/events/${event.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        <Edit size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(event.id)}
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
