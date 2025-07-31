import {
  Settings,
  Plus,
  ScanFace,
  Volleyball,
  PanelsTopLeft,
} from "lucide-react";
import Link from "next/link";

import { createClient } from "@/utils/supabase/server";

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
    <nav className="flex z-50 rounded-2xl px-5 py-3 justify-between bg-white bg-opacity-80 backdrop-blur-sm text-gray-800 sticky top-2 border border-gray-200 w-full">
      <Link href={"/"}>
        <Volleyball />
      </Link>
      {user ? (
        <div className="flex justify-between gap-6">
          <Link href={`/team/${teamData?.id}`}>
            <PanelsTopLeft />
          </Link>
          <Link href={`/create/game`}>
            <Plus />
          </Link>
          <Link href={`/settings`}>
            <Settings />
          </Link>
        </div>
      ) : (
        <Link href={`/login`}>
          <ScanFace />
        </Link>
      )}
    </nav>
  );
}
