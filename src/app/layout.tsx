import type { Metadata } from "next";
import { Manrope, DM_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "700"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Northstar Group — Building a Future of Possibilities",
  description: "Creating opportunities that move people, places and markets forward across staffing, real estate, agriculture, trade and security.",
  authors: [{ name: "Northstar Group" }],
  openGraph: {
    title: "Northstar Group — Building a Future of Possibilities",
    description: "Creating opportunities that move people, places and markets forward.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Northstar Group — Building a Future of Possibilities",
    description: "Creating opportunities that move people, places and markets forward.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${dmSans.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

