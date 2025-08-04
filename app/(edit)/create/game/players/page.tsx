import { createClient } from "@/utils/supabase/server";

import PlayerStatsForm from "@/components/forms/PlayerStatsForm/PlayerStatsForm";

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
    console.log("error", error);
    return <div>Error loading team members</div>;
  }

  console.log("data", data);

  return (
    <div className="space-y-4 my-4">
      {data.players.map((player: any) => {
        const { name } = player;
        return <PlayerStatsForm key={name} gameId={game_id} player={player} />;
      })}
    </div>
  );
}
