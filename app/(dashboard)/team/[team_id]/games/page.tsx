import StatsTable from "@/components/StatsTable/StatsTable";
import { createClient } from "@/utils/supabase/server";
import TableHeader from "@/components/TableHeader/TableHeader";

const headers = [
  { key: "name", label: "Player", align: "left" },
  { key: "goals", label: "Gls", align: "center" },
  { key: "assists", label: "Asts", align: "center" },
  { key: "gk", label: "GK", align: "center" },
];

export default async function Games({
  params,
  searchParams,
}: {
  params: { team_id: string };
  searchParams: { season_id: string };
}) {
  const supabase = await createClient();
  const { team_id } = await params;
  const { season_id } = await searchParams;

  const { data: teamData } = await supabase
    .from("seasons")
    .select("*, teams!inner(id, manager, name)")
    .eq("teams.id", team_id)
    .limit(1)
    .single();

  const { data } = await supabase
    .from("games")
    .select(`*, game_players (*, users (*))`)
    .eq("season_id", season_id);

  console.log("data", data);
  console.log("teamData", teamData);

  if (!teamData) {
    return <div>Team not found</div>;
  }

  return (
    <div className="wrapper">
      <TableHeader season={teamData.name} team={teamData.teams.name} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data?.map((game) => {
          const {
            id,
            opponent,
            opponent_score,
            team_score,
            game_players,
            date,
          } = game;

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
    </div>
  );
}
