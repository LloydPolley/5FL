import Nav from "@/components/Nav/Nav";
import Tabs from "@/components/Tabs/Tabs";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-dvh">
      <Nav />
      <main className="flex-1">
        <Tabs />
        <div className="w-full bg-gray-50 flex p-6 lg:p-12 min-h-screen pt-20">
          {children}
        </div>
      </main>
    </div>
  );
}
