import { Settings, Plus, LogOut, ChartNoAxesColumn } from "lucide-react";
import Link from "next/link";

import { signOutAction } from "@/app/(auth)/auth/signout/action";

const NAV_LINKS = [
  { title: "Overview", component: <ChartNoAxesColumn />, url: "/" },
  { title: "Add Game", component: <Plus />, url: "/addgame" },
  { title: "Settings", component: <Settings />, url: "/settings" },
];

export default async function Footer() {
  return (
    <footer className="flex flex-col w-[calc(100%-1rem)] md:flex-row m-auto rounded-3xl px-5 py-3 justify-evenly bg-gray-100 text-gray-800 h-40 mt-12">
      {NAV_LINKS.map((item) => {
        return (
          <Link key={item.title} href={item.url}>
            {item.title}
          </Link>
        );
      })}
      <form action={signOutAction}>
        <input type="submit" value="Sign out" />
      </form>
    </footer>
  );
}
