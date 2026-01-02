export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <img 
          src="/logo/sapsa-logo.jpeg" 
          alt="SAPSA Logo" 
          className="h-32 w-auto object-contain mx-auto mb-6"
        />
        <h1 className="font-heading text-4xl font-bold mb-4">About SAPSA</h1>
      </div>
      
      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="font-heading text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            The South African Practical Shooting Association (SAPSA) is dedicated to
            promoting excellence in practical shooting sports across South Africa. We
            provide a structured framework for competition, training, and development
            while maintaining the highest standards of safety and sportsmanship.
          </p>
        </section>

        <section className="mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6 mb-4">
            <div className="flex-shrink-0">
              <img 
                src="/logo/ipsc-logo.jpeg" 
                alt="IPSC Logo" 
                className="h-24 w-auto object-contain"
              />
            </div>
            <div>
              <h2 className="font-heading text-2xl font-bold mb-4">IPSC Affiliation</h2>
              <p className="text-gray-700 leading-relaxed">
                SAPSA is the official South African affiliate of the International Practical
                Shooting Confederation (IPSC). This affiliation ensures that our competitions
                and standards align with international best practices, and our members can
                participate in IPSC-sanctioned events worldwide.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-2xl font-bold mb-4">What We Do</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Organize and sanction practical shooting competitions</li>
            <li>Maintain and enforce safety standards</li>
            <li>Provide training and certification programs</li>
            <li>Support clubs and shooting ranges across South Africa</li>
            <li>Represent South African shooters in international competitions</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-bold mb-4">Get Involved</h2>
          <p className="text-gray-700 leading-relaxed">
            Whether you're a seasoned competitor or new to practical shooting,
            SAPSA welcomes your participation. Contact your local club or reach out to
            us directly to learn more about getting involved.
          </p>
        </section>
      </div>
    </div>
  );
}
