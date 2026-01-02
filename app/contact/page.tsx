export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="font-heading text-4xl font-bold mb-8">Contact Us</h1>
      
      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="font-heading text-2xl font-bold mb-4">Get in Touch</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            For general inquiries, membership questions, event information, or any
            other matters related to SAPSA, please contact us using the information
            below.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-2xl font-bold mb-4">Contact Information</h2>
          <div className="space-y-2 text-gray-700">
            <p>
              <strong>Email:</strong> info@sapsa.org.za
            </p>
            <p>
              <strong>Phone:</strong> +27 (0) XX XXX XXXX
            </p>
            <p>
              <strong>Address:</strong> [Address to be added]
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-bold mb-4">Office Hours</h2>
          <p className="text-gray-700">
            Monday - Friday: 9:00 AM - 5:00 PM SAST
          </p>
        </section>
      </div>
    </div>
  );
}
