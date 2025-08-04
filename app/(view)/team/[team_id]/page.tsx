import StatsTable from "@/components/StatsTable/StatsTable";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TableHeader from "@/components/TableHeader/TableHeader";
import { Button } from "@/components/ui/button";
import SelectWrapper from "@/components/SelectWrapper/SelectWrapper";
import { Separator } from "@/components/ui/separator";

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

  console.log("seasons", seasons);

  const activeSeason = season_id
    ? seasons?.find((season) => season.id === Number(season_id))
    : seasons?.[0];

  const { data: playerData, error: playerError } = await supabase.rpc(
    "get_season_player_points",
    {
      p_season_id: activeSeason?.id.toString(),
    }
  );

  return (
    <div className="wrapper">
      <div className="flex flex-row">
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
      />
      <div className="">
        {activeSeason && !playerError ? (
          <StatsTable headers={headers} players={playerData} />
        ) : (
          "Need Team Data"
        )}
      </div>
      <Button className="mt-6 w-full" asChild variant="default">
        <Link href={`/team/${team_id}/games?season_id=${activeSeason?.id}`}>
          See All Games
        </Link>
      </Button>
    </div>
  );
}
