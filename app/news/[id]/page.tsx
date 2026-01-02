import { getNewsArticle, getNews } from "@/lib/firebase/firestore";
import { mockNews } from "@/lib/mockData";
import { format } from "date-fns";
import { notFound } from "next/navigation";

// Make this route dynamic to support mock data in development
export const dynamic = 'force-dynamic';

export default async function NewsArticlePage({
  params,
}: {
  params: { id: string };
}) {
  let article = null;
  
  try {
    article = await getNewsArticle(params.id);
  } catch (error) {
    // Try mock data if Firebase fails
    article = mockNews.find((n) => n.id === params.id) || null;
  }

  if (!article) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {article.imageURL && (
        <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden mb-8">
          <img
            src={article.imageURL}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="flex items-center gap-2 mb-4">
        {article.isPinned && (
          <span className="bg-accent text-white px-2 py-1 text-xs font-bold">
            PINNED
          </span>
        )}
        <span className="text-sm text-gray-500">
          {format(article.publishedAt.toDate(), "MMMM d, yyyy")}
        </span>
      </div>

      <h1 className="font-heading text-4xl font-bold mb-6">{article.title}</h1>

      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </div>
  );
}
