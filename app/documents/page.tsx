import { getDocuments } from "@/lib/firebase/firestore";
import { format } from "date-fns";
import { Download, FileText } from "lucide-react";

export default async function DocumentsPage() {
  let documents = [];
  
  try {
    documents = await getDocuments();
  } catch (error) {
    console.error("Error loading documents:", error);
  }

  const documentsByCategory = documents.reduce(
    (acc, doc) => {
      if (!acc[doc.category]) {
        acc[doc.category] = [];
      }
      acc[doc.category].push(doc);
      return acc;
    },
    {} as Record<string, typeof documents>
  );

  const categories: ("Rules" | "Policies" | "Governance")[] = [
    "Rules",
    "Policies",
    "Governance",
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="font-heading text-4xl font-bold mb-8">Documents</h1>

      {documents.length > 0 ? (
        <div className="space-y-8">
          {categories.map((category) => {
            const categoryDocs = documentsByCategory[category] || [];
            if (categoryDocs.length === 0) return null;

            return (
              <section key={category}>
                <h2 className="font-heading text-2xl font-bold mb-4">{category}</h2>
                <div className="space-y-2">
                  {categoryDocs.map((document) => (
                    <a
                      key={document.id}
                      href={document.pdfURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-3">
                        <FileText size={24} className="text-accent" />
                        <div>
                          <p className="font-semibold">{document.title}</p>
                          <p className="text-sm text-gray-600">
                            Updated: {format(document.updatedAt.toDate(), "MMM d, yyyy")}
                          </p>
                        </div>
                      </div>
                      <Download size={20} className="text-accent" />
                    </a>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500">No documents available at this time.</p>
      )}
    </div>
  );
}
