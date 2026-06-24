import type { Metadata } from "next";
import {Montserrat, Oswald} from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap"
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["500"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "Northland Basketball",
  description: "Basketball association homepage built with Next.js and Tailwind CSS."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${oswald.variable}`}>{children}</body>
    </html>
  );
}
