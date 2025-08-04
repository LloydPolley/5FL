import { Volleyball } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "5FL",
  description: "Login or Sign up",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-dvh">
      <div className="mx-auto mb-20">
        <Link href="/">
          <Volleyball className="size-16" />
        </Link>
      </div>
      {children}
    </div>
  );
}
