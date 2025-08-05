import StatsTable from "@/components/StatsTable/StatsTable";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import TableHeader from "@/components/TableHeader/TableHeader";
import { Separator } from "@/components/ui/separator";
import { ChartLineInteractive } from "@/components/Charts/LineChart";

const headers = [
  { key: "name", label: "Player", align: "left" },
  { key: "appearances", label: "Apps", align: "center" },
  { key: "goals", label: "Gls", align: "center" },
  { key: "assists", label: "Asts", align: "center" },
  { key: "gk", label: "GK", align: "center" },
  { key: "points", label: "Points", align: "center" },
];

export default async function Home({
  params,
  searchParams,
}: {
  params: { team_id: string };
  searchParams: { season_id: string };
}) {
  const { team_id } = await params;
  const { season_id } = await searchParams;
  const supabase = await createClient();

  const { data: seasons, error } = await supabase
    .from("seasons")
    .select("*, teams!inner(id, manager, name)")
    .eq("teams.id", team_id)
    .order("date", { ascending: true });

  const activeSeason = season_id
    ? seasons?.find((season) => season.id === Number(season_id))
    : seasons?.[0];

  const { data: playerData, error: playerError } = await supabase.rpc(
    "get_season_player_points",
    {
      p_season_id: activeSeason?.id.toString(),
    }
  );
  const { data: weeklyData, error: weeklyError } = await supabase.rpc(
    "get_weekly_points_by_season2",
    {
      p_season_id: activeSeason?.id.toString(),
    }
  );

  console.log("weeklyData", weeklyData);

  return (
    <div className="wrapper">
      <div className="flex flex-row  mx-auto justify-center">
        {seasons?.map((season) => (
          <div key={season.id} className="flex flex-row text-sm">
            <Link
              key={season.id}
              href={`/team/${team_id}?season_id=${season.id}`}
            >
              {season.name}
            </Link>
            <Separator className="mx-2" orientation="vertical" />
          </div>
        ))}
      </div>
      <TableHeader
        season={activeSeason?.name}
        team={activeSeason?.teams?.name}
        team_id={team_id}
        activeSeason={activeSeason}
      />
      <div className="">
        {activeSeason && !playerError ? (
          <div className="flex flex-col gap-6 lg:w-[80%] mx-auto">
            <StatsTable headers={headers} players={playerData} />
            <ChartLineInteractive data={weeklyData} />
          </div>
        ) : (
          "Need Team Data"
        )}
      </div>
    </div>
  );
}
