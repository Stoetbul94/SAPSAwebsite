import Link from "next/link";
import { getNews } from "@/lib/firebase/firestore";
import { mockNews } from "@/lib/mockData";
import { format } from "date-fns";

export default async function NewsPage() {
  let news = [];
  
  try {
    news = await getNews();
  } catch (error) {
    console.error("Error loading news:", error);
    // Use mock data if Firebase is not configured
    news = mockNews;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="font-heading text-4xl font-bold mb-8">News</h1>

      {news.length > 0 ? (
        <div className="space-y-6">
          {news.map((article) => (
            <Link
              key={article.id}
              href={`/news/${article.id}`}
              className="block border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="md:flex">
                {article.imageURL && (
                  <div className="md:w-1/3 aspect-video md:aspect-square bg-gray-200">
                    <img
                      src={article.imageURL}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className={`p-6 ${article.imageURL ? "md:w-2/3" : "w-full"}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {article.isPinned && (
                      <span className="bg-accent text-white px-2 py-1 text-xs font-bold">
                        PINNED
                      </span>
                    )}
                    <span className="text-sm text-gray-500">
                      {format(article.publishedAt.toDate(), "MMM d, yyyy")}
                    </span>
                  </div>
                  <h2 className="font-heading text-2xl font-bold mb-2">
                    {article.title}
                  </h2>
                  <p className="text-gray-700 line-clamp-3">
                    {article.content.replace(/<[^>]*>/g, "").substring(0, 200)}...
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No news articles available at this time.</p>
      )}
    </div>
  );
}
