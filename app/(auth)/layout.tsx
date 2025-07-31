import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "5FL",
  description: "Login or Sign up",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="flex flex-col h-dvh pt-[10vh]">{children}</div>;
}
