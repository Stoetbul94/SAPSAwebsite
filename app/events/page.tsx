import Link from "next/link";
import { getEvents, Event } from "@/lib/firebase/firestore";
import { format } from "date-fns";
import { Calendar, MapPin } from "lucide-react";

export default async function EventsPage() {
  let events: Event[] = [];
  
  try {
    events = await getEvents(true);
  } catch (error) {
    console.error("Error loading events:", error);
  }

  const upcomingEvents = events.filter(
    (event) => new Date(event.date) >= new Date()
  );
  const pastEvents = events.filter((event) => new Date(event.date) < new Date());

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="font-heading text-4xl font-bold mb-8">Events</h1>

      {upcomingEvents.length > 0 && (
        <section className="mb-12">
          <h2 className="font-heading text-2xl font-bold mb-6">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.id}`}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                {event.imageURL && (
                  <div className="aspect-video bg-gray-200">
                    <img
                      src={event.imageURL}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-heading text-xl font-bold mb-2">
                    {event.title}
                  </h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>{format(new Date(event.date), "MMM d, yyyy")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span>{event.location}</span>
                    </div>
                    <p className="text-accent font-semibold">{event.discipline}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {pastEvents.length > 0 && (
        <section>
          <h2 className="font-heading text-2xl font-bold mb-6">Past Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.id}`}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow opacity-75"
              >
                {event.imageURL && (
                  <div className="aspect-video bg-gray-200">
                    <img
                      src={event.imageURL}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-heading text-xl font-bold mb-2">
                    {event.title}
                  </h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>{format(new Date(event.date), "MMM d, yyyy")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span>{event.location}</span>
                    </div>
                    <p className="text-accent font-semibold">{event.discipline}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {events.length === 0 && (
        <p className="text-gray-500">No events scheduled at this time.</p>
      )}
    </div>
  );
}
