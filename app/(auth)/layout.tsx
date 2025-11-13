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
      <div className="absolute left-5 top-5">
        <Link href="/">
          <Volleyball className="size-8" />
        </Link>
      </div>
      <div className="m-auto w-full max-w-md p-8">{children}</div>
    </div>
  );
}
