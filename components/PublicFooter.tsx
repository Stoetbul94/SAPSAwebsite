import Link from "next/link";

export function PublicFooter() {
  return (
    <footer className="bg-primary text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <img 
              src="/logo/sapsa-logo.jpeg" 
              alt="SAPSA Logo" 
              className="h-16 w-auto object-contain mb-4"
            />
            <p className="text-sm text-gray-300">
              South African Practical Shooting Association
            </p>
            <div className="mt-4 flex items-center gap-3">
              <span className="text-xs text-gray-400">IPSC Affiliate</span>
              <img 
                src="/logo/ipsc-logo.jpeg" 
                alt="IPSC" 
                className="h-8 w-auto object-contain opacity-80"
              />
            </div>
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-accent transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-accent transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/documents" className="hover:text-accent transition-colors">
                  Documents
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold mb-4">Admin</h3>
            <Link
              href="/admin"
              className="text-sm hover:text-accent transition-colors"
            >
              Admin Login
            </Link>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-300">
          <p>&copy; {new Date().getFullYear()} SAPSA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
