import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Santiago Torrado | AML/KYC · Applied Economics · Data Analytics",
  description:
    "Analyst and economist based in Buenos Aires. AML/KYC at American Express, MSc Applied Economics at UTDT. Available for financial crime analytics, applied econometrics, and data projects — Argentine and international opportunities.",
  keywords: [
    "AML analyst",
    "KYC analyst",
    "financial crime analytics",
    "applied economics",
    "data analytics Buenos Aires",
    "econometrics",
    "UTDT",
    "Santiago Torrado",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${cormorant.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
