import { getResults } from "@/lib/firebase/firestore";
import { format } from "date-fns";
import { Download } from "lucide-react";

export default async function ResultsPage() {
  let results = [];
  
  try {
    results = await getResults();
  } catch (error) {
    console.error("Error loading results:", error);
  }

  // Group results by year
  const resultsByYear = results.reduce((acc, result) => {
    if (!acc[result.year]) {
      acc[result.year] = [];
    }
    acc[result.year].push(result);
    return acc;
  }, {} as Record<number, typeof results>);

  const years = Object.keys(resultsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="font-heading text-4xl font-bold mb-8">Competition Results</h1>

      {years.length > 0 ? (
        <div className="space-y-8">
          {years.map((year) => (
            <section key={year}>
              <h2 className="font-heading text-2xl font-bold mb-4">{year}</h2>
              <div className="space-y-2">
                {resultsByYear[year].map((result) => (
                  <a
                    key={result.id}
                    href={result.pdfURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div>
                      <p className="font-semibold">Event ID: {result.eventId}</p>
                      <p className="text-sm text-gray-600">
                        Published: {format(result.publishedAt.toDate(), "MMM d, yyyy")}
                      </p>
                    </div>
                    <Download size={20} className="text-accent" />
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No results available at this time.</p>
      )}
    </div>
  );
}
