import {
  Settings,
  Plus,
  LogOut,
  ChartNoAxesColumn,
  Volleyball,
  PanelsTopLeft,
} from "lucide-react";
import Link from "next/link";

import { createClient } from "@/utils/supabase/server";
import { signOutAction } from "@/app/(auth)/auth/signout/action";

const NAV_LINKS = [
  { title: "Overview", component: <PanelsTopLeft />, url: "/" },
  { title: "Games", component: <ChartNoAxesColumn />, url: "/games" },
  { title: "Add Game", component: <Plus />, url: "/addgame" },
  { title: "Settings", component: <Settings />, url: "/settings" },
];

export default async function Nav() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: teamData } = await supabase
    .from("teams")
    .select()
    .eq("manager", user?.id)
    .single();

  return (
    <nav className="flex w-[calc(100%-1rem)] z-50 m-auto rounded-3xl px-5 py-3 justify-between bg-gray-100 bg-opacity-80 backdrop-blur-sm text-gray-800 sticky top-2 border border-gray-200">
      <Link href={"/"}>
        <Volleyball />
      </Link>
      {user && (
        <div className="flex w-[50%] justify-between">
          {NAV_LINKS.map((item) => {
            let url = item.url;
            url = `/${teamData?.id}/${item.url}`;

            return (
              <Link key={item.title} href={url}>
                {item.component}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
