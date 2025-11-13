import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { ArrowDownRight, Volleyball } from "lucide-react";
import { Card } from "@/components/ui/card";
import FormHeader from "@/components/form/FormHeader/FormHeader";

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
    .select(
      `*,
      season:seasons(name)`
    )
    .eq("team_id", team_id)
    .order("date", { ascending: false });

  console.log("games", games);

  return (
    <div className="wrapper min-w-[300px]">
      <FormHeader title="Edit Games" description="Select game to edit" />
      <div className="space-y-3 mt-4">
        {games?.map((game) => (
          <Card key={game.id} className="border">
            <Link
              href={`/create/game?game_id=${game.id}`}
              className="flex items-center p-3"
            >
              <Volleyball className="w-8 h-8 mr-4" />
              <div className="flex flex-col">
                <p className="text-xs text-gray-500">
                  {new Date(game.date).toLocaleDateString()}
                </p>
                <p className="font-semibold">{game.opponent}</p>
                <p className="text-xs text-gray-400">{game.season.name}</p>
              </div>
              <ArrowDownRight className="ml-auto w-6 h-6 text-gray-400" />
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
