import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "BMW Heritage Portal — Sheer Driving Pleasure Since 1916",
    template: "%s | BMW Heritage Portal",
  },
  description: "Explore BMW's 110-year journey from Bavarian aircraft engines to electric M performance. An interactive editorial portal covering heritage, motorsport, models, and design.",
  keywords: ["BMW", "BMW M", "BMW Heritage", "BMW History", "BMW 328", "M Performance", "Electric BMW", "BMW Configurator"],
  authors: [{ name: "BMW Heritage Portal" }],
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "BMW Heritage Portal — Sheer Driving Pleasure Since 1916",
    description: "Explore BMW's 110-year journey from Bavarian aircraft engines to electric M performance.",
    siteName: "BMW Heritage Portal",
  },
  twitter: {
    card: "summary_large_image",
    title: "BMW Heritage Portal",
    description: "Explore BMW's 110-year journey from Bavarian aircraft engines to electric M performance.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorantGaramond.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
