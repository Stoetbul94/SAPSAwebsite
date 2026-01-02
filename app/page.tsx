import Link from "next/link";
import { getNews, News } from "@/lib/firebase/firestore";
import { getEvents, Event } from "@/lib/firebase/firestore";
import { mockNews } from "@/lib/mockData";
import { format } from "date-fns";
import { ArrowRight, Calendar, MapPin } from "lucide-react";

export default async function HomePage() {
  let latestNews: News[] = [];
  let upcomingEvents: Event[] = [];
  
  try {
    latestNews = await getNews(3);
    upcomingEvents = await getEvents(true);
  } catch (error) {
    console.error("Error loading homepage data:", error);
    // Use mock data if Firebase is not configured
    latestNews = mockNews.slice(0, 3);
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <img 
              src="/logo/sapsa-logo.jpeg" 
              alt="SAPSA Logo" 
              className="h-32 md:h-40 w-auto object-contain"
            />
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            South African Practical Shooting Association
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            Promoting excellence in practical shooting sports across South Africa
          </p>
          <div className="flex items-center justify-center gap-4">
            <span className="text-sm text-gray-400">Affiliated with</span>
            <img 
              src="/logo/ipsc-logo.jpeg" 
              alt="IPSC" 
              className="h-12 w-auto object-contain opacity-90"
            />
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-heading text-3xl font-bold">Latest News</h2>
            <Link
              href="/news"
              className="text-accent hover:underline flex items-center gap-2"
            >
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestNews.length > 0 ? (
              latestNews.map((article) => (
                <Link
                  key={article.id}
                  href={`/news/${article.id}`}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {article.imageURL && (
                    <div className="aspect-video bg-gray-200 relative">
                      <img
                        src={article.imageURL}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                      {article.isPinned && (
                        <span className="absolute top-2 right-2 bg-accent text-white px-2 py-1 text-xs font-bold">
                          PINNED
                        </span>
                      )}
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-heading text-xl font-bold mb-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {article.content.replace(/<[^>]*>/g, "").substring(0, 150)}...
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      {format(article.publishedAt.toDate(), "MMM d, yyyy")}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-500 col-span-3">No news articles yet.</p>
            )}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-heading text-3xl font-bold">Upcoming Events</h2>
            <Link
              href="/events"
              className="text-accent hover:underline flex items-center gap-2"
            >
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.length > 0 ? (
              upcomingEvents
                .filter((event) => new Date(event.date) >= new Date())
                .slice(0, 6)
                .map((event) => (
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
                ))
            ) : (
              <p className="text-gray-500 col-span-3">No upcoming events scheduled.</p>
            )}
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-center mb-12">Our Sponsors</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow w-full h-32">
              <img 
                src="/sponsors/crlogoLEV4.png" 
                alt="Sponsor" 
                className="max-w-full max-h-20 w-auto h-auto object-contain"
              />
            </div>
            <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow w-full h-32">
              <img 
                src="/sponsors/RHTlogoLEV4.png" 
                alt="Sponsor" 
                className="max-w-full max-h-20 w-auto h-auto object-contain"
              />
            </div>
            <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow w-full h-32">
              <img 
                src="/sponsors/ShootingStuffLogoredsept.png" 
                alt="Sponsor" 
                className="max-w-full max-h-20 w-auto h-auto object-contain"
              />
            </div>
            <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow w-full h-32 col-span-2 md:col-span-1">
              <Link 
                href="/sponsors"
                className="text-accent hover:underline font-semibold text-center"
              >
                View All Sponsors
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About SAPSA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
            <div className="flex-shrink-0">
              <img 
                src="/logo/sapsa-logo.jpeg" 
                alt="SAPSA Logo" 
                className="h-32 w-auto object-contain"
              />
            </div>
            <div className="text-center md:text-left">
              <h2 className="font-heading text-3xl font-bold mb-4">About SAPSA</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                The South African Practical Shooting Association (SAPSA) is the national
                governing body for practical shooting sports in South Africa. We are
                affiliated with the International Practical Shooting Confederation (IPSC)
                and work to promote, develop, and regulate practical shooting competitions
                across the country.
              </p>
              <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                <span className="text-sm text-gray-600">IPSC Affiliate</span>
                <img 
                  src="/logo/ipsc-logo.jpeg" 
                  alt="IPSC" 
                  className="h-10 w-auto object-contain"
                />
              </div>
              <Link
                href="/about"
                className="inline-block bg-primary text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
