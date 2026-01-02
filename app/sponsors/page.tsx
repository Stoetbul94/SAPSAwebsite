export default function SponsorsPage() {
  const sponsors = [
    { logo: "/sponsors/crlogoLEV4.png", name: "CR" },
    { logo: "/sponsors/RHTlogoLEV4.png", name: "RHT" },
    { logo: "/sponsors/ShootingStuffLogoredsept.png", name: "Shooting Stuff" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="font-heading text-4xl font-bold mb-4">Our Sponsors</h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          SAPSA is grateful for the support of our sponsors who help make our
          competitions and programs possible.
        </p>
      </div>

      {/* Sponsor Logos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {sponsors.map((sponsor, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-8 flex items-center justify-center hover:shadow-lg transition-shadow h-48"
          >
            <img
              src={sponsor.logo}
              alt={sponsor.name}
              className="max-w-full max-h-32 w-auto h-auto object-contain"
            />
          </div>
        ))}
      </div>

      {/* Become a Sponsor Section */}
      <div className="bg-gray-50 rounded-lg p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">Become a Sponsor</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Interested in sponsoring SAPSA events or programs? We offer various
            sponsorship opportunities that provide visibility and engagement with the
            practical shooting community across South Africa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-block bg-primary text-white px-8 py-3 rounded hover:bg-gray-800 transition-colors font-semibold"
            >
              Contact Us
            </a>
            <a
              href="/about"
              className="inline-block bg-white text-primary border-2 border-primary px-8 py-3 rounded hover:bg-gray-50 transition-colors font-semibold"
            >
              Learn More About SAPSA
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
