import { createClient } from "@/utils/supabase/server";
import { getUser } from "@/utils/users/getUser";

export default async function Home() {
  const supabase = await createClient();
  const user = await getUser();

  const { data: team } = await supabase
    .from("teams")
    .select()
    .eq("manager", user?.UID)
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

  console.log("data", data);

  return (
    <div className="h-dvh flex flex-col p-4 space-y-8">
      <h1 className="text-4xl font-extrabold">{team.name}</h1>
      {data?.map((game) => {
        const { id, opponent, opponent_score, team_score, game_players, date } =
          game;

        // Sort players by combined goals + assists descending
        const sortedPlayers = [...game_players].sort((a, b) => {
          const aTotal = (a.goals ?? 0) + (a.assists ?? 0);
          const bTotal = (b.goals ?? 0) + (b.assists ?? 0);
          return bTotal - aTotal;
        });

        const gameDate = new Date(date);

        return (
          <div key={id} className="w-full">
            <p className="text-sm">{gameDate.toDateString()}</p>
            <h2 className="text-2xl">
              Ballers {team_score}-{opponent_score} {opponent}
            </h2>
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Player
                  </th>
                  {/* <th className="border border-gray-300 px-4 py-2 text-center">
                    App
                  </th> */}
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Gls
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Asts
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    GK
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedPlayers.map(
                  (stats: {
                    users: { name: string };
                    appearance: boolean;
                    goals: number;
                    assists: number;
                    gk: number;
                    id: number;
                  }) => {
                    const { users, goals, assists, gk, id } = stats;
                    return (
                      <tr key={id} className="hover:bg-gray-100">
                        <td className="border border-gray-300 px-4 py-2">
                          {users?.name}
                        </td>
                        {/* <td className="border border-gray-300 px-4 py-2 text-center">
                          {appearance ? "Yes" : "No"}
                        </td> */}
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          {goals}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          {assists}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          {gk}
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}
