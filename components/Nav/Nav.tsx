import { Gauge, ScanFace, Volleyball, CalendarPlus } from "lucide-react";
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
    <nav className="z-50 px-5 py-3 bg-bapckground sticky top-0 w-full rounded-sm mx-auto">
      <div className="max-w-7xl px-4 py-2 mx-auto flex justify-between items-center">
        <Link href={"/"}>
          <Volleyball />
        </Link>
        {user ? (
          <div className="flex justify-between gap-6">
            <Link href={`/team/${teamData?.id}`}>
              <Gauge />
            </Link>
            <Link href={`/create/game`}>
              <CalendarPlus />
            </Link>
          </div>
        ) : (
          <Link href={`/login`}>
            <ScanFace />
          </Link>
        )}
      </div>
    </nav>
  );
}
