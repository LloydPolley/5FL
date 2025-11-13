import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PlayerStatsForm from "@/components/form/PlayerStatsForm/PlayerStatsForm";
import FormHeader from "@/components/form/FormHeader/FormHeader";

export default async function Games({
  searchParams,
}: {
  searchParams: { game_id: string };
}) {
  const supabase = await createClient();
  const { game_id } = await searchParams;

  const { data, error } = await supabase.rpc("get_game_with_players_nested", {
    p_game_id: game_id,
  });

  if (!data || error) {
    return <div>Error loading team members</div>;
  }

  return (
    <div className="space-y-6 my-4 mx-auto">
      <FormHeader
        title="Add Player Stats"
        description="Add player stats for this game"
      />
      {data.players.map((player: any) => {
        const { name } = player;
        return <PlayerStatsForm key={name} gameId={game_id} player={player} />;
      })}
      <Button asChild variant="ghost" className="w-full">
        <Link href="/create/game">Finish</Link>
      </Button>
    </div>
  );
}
