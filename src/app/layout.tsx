import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MileHiiv - Professional Mileage Tracking for Gig Drivers",
  description: "Advanced mileage tracking and gap detection for gig drivers and business professionals. PDF processing, intelligent gap detection, and tax-ready reports.",
  keywords: "mileage tracking, gig economy, tax deduction, PDF processing, gap detection, uber, lyft, doordash",
  authors: [{ name: "MileHiiv Team" }],
  creator: "MileHiiv",
  publisher: "MileHiiv",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://milehiiv.com',
    title: 'MileHiiv - Professional Mileage Tracking',
    description: 'Advanced mileage tracking and gap detection for gig drivers and business professionals.',
    siteName: 'MileHiiv',
    images: [
      {
        url: 'https://milehiiv.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MileHiiv - Professional Mileage Tracking',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MileHiiv - Professional Mileage Tracking',
    description: 'Advanced mileage tracking and gap detection for gig drivers and business professionals.',
    creator: '@milehiiv',
    images: ['https://milehiiv.com/og-image.jpg'],
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://milehiiv.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
