import Nav from "@/components/Nav/Nav";
import Tabs from "@/components/Tabs/Tabs";
import { Card } from "@/components/ui/card";

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
        <div className="max-w-3xl mx-auto p-4">
          <Card className="w-full p-4">{children}</Card>
        </div>
      </main>
    </div>
  );
}
