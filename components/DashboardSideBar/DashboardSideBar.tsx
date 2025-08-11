import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import GameStatsSelector from "../GameStatsSelector/GameStatsSelector";

const recentMatches = [
  { opponent: "Ocean FC", result: "W", score: "3-1", date: "Jan 13" },
  { opponent: "No Kane, No Gain", result: "D", score: "2-2", date: "Jan 6" },
  { opponent: "Rangers", result: "W", score: "4-0", date: "Dec 30" },
];

export default function DashboardSideBar({ games, headers, season }) {
  return (
    <div className="lg:col-span-1">
      <CardHeader>
        <CardTitle>Match Overview</CardTitle>
        <p className="text-sm text-muted-foreground">
          Recent results and upcoming fixtures
        </p>
      </CardHeader>
      {/* 🆕 Game Statistics Section */}
      <GameStatsSelector games={games} headers={headers} season={season} />
    </div>
  );
}
