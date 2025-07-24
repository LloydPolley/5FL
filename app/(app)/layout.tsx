import { Geist, Geist_Mono, Urbanist } from "next/font/google";

import Nav from "@/components/Nav/Nav";

import "../globals.css";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${urbanist.variable} antialiased min-h-screen`}
      >
        <Nav />
        <main className="flex-1 w-full p-4">{children}</main>
      </body>
    </html>
  );
}
