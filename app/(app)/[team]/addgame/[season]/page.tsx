import { createClient } from "@/utils/supabase/server";
import { getUser } from "@/utils/users/getUser";

import GameWrapper from "../components/GameWrapper";

export default async function Games({
  params,
}: {
  params: { team: string; season: string };
}) {
  const supabase = await createClient();
  const { team, season } = await params;

  console.log("season", season);

  const { data: playerData } = await supabase
    .from("users")
    .select("name, id")
    .eq("team_id", team);

  if (!playerData) {
    return <div>Error loading team members</div>;
  }

  return (
    <GameWrapper teamMembers={playerData} teamId={team} seasonId={season} />
  );
}
