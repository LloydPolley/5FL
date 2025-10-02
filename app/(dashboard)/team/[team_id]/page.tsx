import { createClient } from "@/utils/supabase/server";
import QuickStatsCards from "@/components/TeamDashboard/QuickStatsCards/QuickStatsCards";
import TeamBanner from "@/components/TeamDashboard/TeamBanner/TeamBanner";
import DashboardPointsWidget from "@/components/DashboardPointsWidget/DashboardPointsWidget";
import DashboardSideBar from "@/components/DashboardSideBar/DashboardSideBar";
import GameStatsSelectorMini from "@/components/GameStatSelectorMini/GameStatsSelectorMini";

export default async function Overview({
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
    .order("date", { ascending: false });

  const activeSeason = season_id
    ? seasons?.find((season) => season.id === Number(season_id))
    : seasons?.[0];

  console.log("activeSeason", activeSeason);
  console.log("activeSeason?.id.toString()", activeSeason?.id.toString());

  const { data: playerData, error: playerError } = await supabase.rpc(
    "get_season_player_points",
    {
      p_season_id: activeSeason?.id.toString(),
    }
  );

  const { data: quickOverviewStats, error: QuickOverviewStatsError } =
    await supabase.rpc("get_team_stats", {
      p_team_id: team_id,
      p_season_id: season_id || seasons?.[0]?.id.toString(),
    });

  // 🆕 Fetch game data for the season
  const { data: games, error: gamesError } = await supabase
    .from("games")
    .select(
      `
      id,
      date,
      team_score,
      opponent_score,
      opponent,
      season_id,
      game_players (
        id,
        goals,
        assists,
        gk,
        appearance,
        users (
          id,
          name
        )
      )
    `
    )
    .eq("season_id", activeSeason?.id)
    .order("date", { ascending: false });

  // 🆕 Transform game data for the component
  const formattedGames =
    games?.map((game) => ({
      id: game.id,
      date: game.date,
      team_score: game.team_score,
      opponent_score: game.opponent_score,
      opponent: game.opponent,
      playerStats:
        game.game_players?.map((stat) => ({
          id: stat.users?.id,
          name: stat.users?.name,
          player: stat.users?.name, // For table compatibility
          goals: stat.goals,
          gls: stat.goals, // Alternative key for table
          assists: stat.assists,
          asts: stat.assists, // Alternative key for table
          gk: stat.gk,
          appearance: stat.appearance,
          apps: stat.appearance ? 1 : 0, // Convert boolean to appearance count
        })) || [],
    })) || [];

  // 🆕 Headers for game stats table
  const gameStatsHeaders = [
    { key: "player", label: "Player", align: "left" as const },
    { key: "apps", label: "Apps" },
    { key: "gls", label: "Gls" },
    { key: "asts", label: "Asts" },
    { key: "gk", label: "GK" },
  ];

  return (
    <div className="space-y-8">
      <TeamBanner
        teamName={activeSeason?.teams?.name}
        manager={"Lloyd"}
        homeGround={activeSeason?.teams?.home_ground}
        founded={activeSeason?.teams?.founded}
        league={activeSeason?.teams?.league}
        seasons={seasons}
        team_id={team_id}
        activeSeason={activeSeason}
      />

      <QuickStatsCards quickOverviewStats={quickOverviewStats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DashboardPointsWidget
          activeSeason={activeSeason}
          playerError={playerError}
          playerData={playerData}
          topScorers={quickOverviewStats?.topScorers}
        />
        <DashboardSideBar
          games={formattedGames}
          headers={gameStatsHeaders}
          season={activeSeason}
        />
      </div>
    </div>
  );
}
