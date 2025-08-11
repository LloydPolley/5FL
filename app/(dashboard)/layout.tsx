import Nav from "@/components/Nav/Nav";

import "../globals.scss";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-7xl p-4">{children}</main>
    </>
  );
}
