import StatsTable from "@/components/StatsTable/StatsTable";
import { createClient } from "@/utils/supabase/server";
import { getUser } from "@/utils/users/getUser";

const headers = [
  { key: "name", label: "Player", align: "left" },
  { key: "goals", label: "Gls", align: "center" },
  { key: "assists", label: "Asts", align: "center" },
  { key: "gk", label: "GK", align: "center" },
];

export default async function Games({ params }: { params: { team: string } }) {
  const supabase = await createClient();
  const user = await getUser();

  const { team } = await params;

  const { data: teamData } = await supabase
    .from("teams")
    .select()
    .eq("id", params.team)
    .limit(1)
    .single();

  // console.log("team", team);

  // const { data: season } = await supabase
  //   .from("seasons")
  //   .select()
  //   .eq("team_id", user.team_id)
  //   .limit(1)
  //   .single();

  const { data } = await supabase
    .from("games")
    .select(`*, game_players (*, users (*))`);

  // console.log("data", data);

  return (
    <div className="h-dvh flex flex-col space-y-8">
      <h1 className="text-4xl font-extrabold">{teamData.name}</h1>
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
