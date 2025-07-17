"use client";

import { Settings, DiamondPlus, LogOut, ChartNoAxesColumn } from "lucide-react";
import Link from "next/link";

import { createClient } from "@/utils/supabase/client";

const NAV_LINKS = [
  { title: "dashboard", component: <ChartNoAxesColumn />, url: "/" },
  { title: "Add Game", component: <DiamondPlus />, url: "/games" },
  { title: "Settings", component: <Settings />, url: "/settings" },
];

export default function Nav() {
  const signOut = async () => {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      console.log("sign out");
      await supabase.auth.signOut();
    }
  };

  return (
    <nav className="flex  w-[80%] m-auto mt-3 rounded-3xl px-5 py-3 justify-evenly text-gray-500">
      {NAV_LINKS.map((item) => (
        <Link key={item.title} href={item.url}>
          {item.component}
        </Link>
      ))}
      <button
        onClick={async () => {
          await signOut();
        }}
      >
        <LogOut />
      </button>
    </nav>
  );
}
