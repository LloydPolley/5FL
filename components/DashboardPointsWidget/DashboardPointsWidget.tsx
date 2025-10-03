import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import StatsTable from "../Tables/StatsTableCard/StatsTableCard";
import BarChartMixed from "../TeamDashboard/BarChartTop/BarChartMixed";

export default function DashboardPointsWidget({
  activeSeason,
  playerError,
  playerData,
  topScorers,
}: {
  activeSeason: any;
  playerError: any;
  playerData: any;
  topScorers: any;
}) {
  console.log("ACTIVE SEASON", activeSeason);

  const { appearance_weight, goals_weight, assist_weight, gk_weight } =
    activeSeason;

  const headers = [
    { key: "name", label: "Player", align: "left" },
    {
      key: "appearances",
      label: "Apps",
      align: "center",
      points: appearance_weight,
    },
    { key: "goals", label: "Gls", align: "center", points: goals_weight },
    { key: "assists", label: "Asts", align: "center", points: assist_weight },
    { key: "gk", label: "GK", align: "center", points: gk_weight },
    { key: "points", label: "Points", align: "center" },
  ];
  return (
    <div className="lg:col-span-2">
      {activeSeason && !playerError ? (
        <Card className="h-fit">
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">
                {activeSeason?.name} Statistics
              </CardTitle>
            </div>
            <p className="text-sm text-muted-foreground">
              Player statistics and performance trends for{" "}
              {activeSeason?.teams?.name}
            </p>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <h3 className="font-semibold mb-4 text-gray-900">
                Player Statistics
              </h3>
              <StatsTable headers={headers} players={playerData} />
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">Need Team Data</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
