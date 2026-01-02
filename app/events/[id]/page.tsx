import { getEvent, getEvents } from "@/lib/firebase/firestore";
import { format } from "date-fns";
import { Calendar, MapPin } from "lucide-react";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  try {
    const events = await getEvents(true);
    return events.map((event) => ({ id: event.id }));
  } catch (error) {
    // Return empty array if Firebase is not configured during build
    return [];
  }
}

export default async function EventDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const event = await getEvent(params.id);

  if (!event || !event.isPublished) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {event.imageURL && (
        <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden mb-8">
          <img
            src={event.imageURL}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <h1 className="font-heading text-4xl font-bold mb-4">{event.title}</h1>

      <div className="flex flex-wrap gap-4 mb-6 text-gray-600">
        <div className="flex items-center gap-2">
          <Calendar size={20} />
          <span>{format(new Date(event.date), "MMMM d, yyyy")}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={20} />
          <span>{event.location}</span>
        </div>
        <span className="text-accent font-semibold">{event.discipline}</span>
      </div>

      <div className="prose prose-lg max-w-none">
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {event.description}
        </p>
      </div>
    </div>
  );
}
