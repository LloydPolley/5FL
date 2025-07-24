import StatsTable from "@/components/StatsTable/StatsTable";
import { createClient } from "@/utils/supabase/server";

const headers = [
  { key: "name", label: "Player", align: "left" },
  { key: "appearances", label: "Apps", align: "center" },
  { key: "goals", label: "Gls", align: "center" },
  { key: "assists", label: "Asts", align: "center" },
  { key: "gk", label: "GK", align: "center" },
  { key: "points", label: "Points", align: "center" },
];

export default async function Home({ params }: { params: { team: string } }) {
  const { team } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("seasons")
    .select("*, teams!inner(id, manager, name)")
    .eq("teams.id", team)
    .order("date", { ascending: false })
    .limit(1)
    .single();

  console.log("Fetched Data", data);

  const { data: playerData, error: playerError } = await supabase.rpc(
    "get_season_player_points",
    {
      p_season_id: data?.id,
    }
  );

  console.log("playerData", playerData);

  return (
    <div className="flex flex-col space-y-4 mt-8">
      <h1 className="text-4xl font-extrabold">{data?.teams?.name}</h1>
      <div className="w-full">
        {data?.length !== 0 && !playerError ? (
          <StatsTable headers={headers} players={playerData} />
        ) : (
          "Need Team Data"
        )}
      </div>
    </div>
  );
}
