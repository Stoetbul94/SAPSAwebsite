export default function ClubsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="font-heading text-4xl font-bold mb-8">Club Directory</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-700 leading-relaxed mb-6">
          SAPSA-affiliated clubs provide training, facilities, and competition
          opportunities for practical shooting enthusiasts across South Africa.
        </p>
        
        <section className="mb-8">
          <h2 className="font-heading text-2xl font-bold mb-4">Finding a Club</h2>
          <p className="text-gray-700 leading-relaxed">
            To find a club near you, please contact SAPSA directly. We can provide
            information about affiliated clubs in your area, their facilities, and
            membership requirements.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-2xl font-bold mb-4">Club Affiliation</h2>
          <p className="text-gray-700 leading-relaxed">
            Clubs interested in becoming SAPSA-affiliated should contact us to learn
            about the affiliation process, requirements, and benefits.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-bold mb-4">Contact</h2>
          <p className="text-gray-700 leading-relaxed">
            For club-related inquiries, please visit our{" "}
            <a href="/contact" className="text-accent hover:underline">
              contact page
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
