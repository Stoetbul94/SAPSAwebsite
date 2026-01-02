import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { PublicNav } from "@/components/PublicNav";
import { PublicFooter } from "@/components/PublicFooter";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const oswald = Oswald({ 
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SAPSA - South African Practical Shooting Association",
  description: "Official website of the South African Practical Shooting Association",
  icons: {
    icon: "/logo/sapsa-logo.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
      <body className="min-h-screen flex flex-col">
        <PublicNav />
        <main className="flex-grow">{children}</main>
        <PublicFooter />
      </body>
    </html>
  );
}
