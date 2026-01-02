import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <h1 className="font-heading text-6xl font-bold mb-4">404</h1>
      <h2 className="font-heading text-2xl font-bold mb-4">Page Not Found</h2>
      <p className="text-gray-600 mb-8">
        The page you're looking for doesn't exist.
      </p>
      <Link
        href="/"
        className="inline-block bg-primary text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}
