import StatsTable from "@/components/StatsTable/StatsTable";
import { createClient } from "@/utils/supabase/server";
import { getUser } from "@/utils/users/getUser";

const headers = [
  { key: "name", label: "Player", align: "left" },
  { key: "goals", label: "Gls", align: "center" },
  { key: "assists", label: "Asts", align: "center" },
  { key: "gk", label: "GK", align: "center" },
];

export default async function Games({
  params,
}: {
  params: { team_id: string };
}) {
  const supabase = await createClient();

  const { data: teamData } = await supabase
    .from("teams")
    .select()
    .eq("id", params.team_id)
    .limit(1)
    .single();

  const { data } = await supabase
    .from("games")
    .select(`*, game_players (*, users (*))`);

  return (
    <div className="wrapper">
      <h1 className="h1">{teamData.name}</h1>
      {data?.map((game) => {
        const { id, opponent, opponent_score, team_score, game_players, date } =
          game;

        // Sort players by combined goals + assists descending
        const sortedPlayers = [...game_players].sort((a, b) => {
          const aTotal = (a.goals ?? 0) + (a.assists ?? 0);
          const bTotal = (b.goals ?? 0) + (b.assists ?? 0);
          return bTotal - aTotal;
        });

        return (
          <div key={id} className="w-full">
            <StatsTable
              headers={headers}
              players={sortedPlayers}
              team_score={team_score}
              opponent_score={opponent_score}
              opponent={opponent}
              date={new Date(date).toDateString()}
            />
          </div>
        );
      })}
    </div>
  );
}
