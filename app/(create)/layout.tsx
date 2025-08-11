import Nav from "@/components/Nav/Nav";
import SideBar from "@/components/SideBar/SideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-5xl p-4 flex flex-row">
        <SideBar />
        {children}
      </main>
    </>
  );
}
