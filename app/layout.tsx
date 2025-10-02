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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full mx-auto bg-white">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${urbanist.variable} antialiased min-h-screen bg-background`}
      >
        <main className="flex-1 w-full bg-gradient-to-r from-neutral-200 to-gray-200 ">
          {children}
        </main>
      </body>
    </html>
  );
}
