import Nav from "@/components/Nav/Nav";
import SubNav from "@/components/Nav/SubNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-dvh">
      <Nav />
      <SubNav />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto p-4">{children}</div>
      </main>
    </div>
  );
}
