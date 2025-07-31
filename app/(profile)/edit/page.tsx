import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { ArrowDownRight, Volleyball } from "lucide-react";

export default async function Games() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  const { data: userData } = await supabase
    .from("users")
    .select("*")
    .eq("UID", data?.user?.id)
    .single();

  const { team_id } = userData;

  const { data: games } = await supabase
    .from("games")
    .select("*")
    .eq("team_id", team_id)
    .order("date", { ascending: false });

  return (
    <div className="wrapper">
      <h1 className="h1">Edit Game</h1>
      <div className="space-y-4">
        {games?.map((game) => (
          <Link
            key={game.id}
            href={`/create/game?game_id=${game.id}`}
            className="flex px-4 py-5 rounded-full widget hover:text-black transition-all"
          >
            <Volleyball className="my-auto mr-8 size-8" />
            <div className="flex flex-col my-auto">
              <p className="text-xs">{game.date}</p>
              <p className="font-bold text-black">{game.opponent}</p>
            </div>
            <ArrowDownRight className="ml-auto my-auto size-8" />
          </Link>
        ))}
      </div>
    </div>
  );
}
