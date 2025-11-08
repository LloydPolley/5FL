import { Geist, Geist_Mono, Urbanist } from "next/font/google";

import "./globals.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${urbanist.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <main className="flex-1 w-full mx-auto">{children}</main>
      </body>
    </html>
  );
}
