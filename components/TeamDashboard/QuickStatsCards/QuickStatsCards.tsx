import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import {
  Target,
  Shield,
  TrendingUp,
  Trophy,
  Users,
  Calendar,
  TrendingDown,
} from "lucide-react";

export default async function QuickStatsCards({
  quickOverviewStats,
}: {
  quickOverviewStats: any;
}) {
  console.log("QuickOverviewStats", quickOverviewStats);
  const {
    topScorer,
    topAssister,
    totalGoals,
    goalDifference,
    winRate,
    wins,
    totalGames,
    draws,
    totalPlayers,
    totalGoalsConceded,
  } = quickOverviewStats;

  // Calculate derived values for better insights
  const losses = totalGames - wins - draws;
  const goalsPerGame =
    totalGames > 0 ? (totalGoals / totalGames).toFixed(1) : "0";
  const concededPerGame =
    totalGames > 0 ? (totalGoalsConceded / totalGames).toFixed(1) : "0";

  const cardInfo = [
    {
      title: "Top Scorer",
      value: topScorer.name,
      icon: Trophy,
      subText: `${topScorer.goals} goals this season`,
      trend: "positive",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      title: "Top Assists",
      value: topAssister.name,
      icon: Shield,
      subText: `${topAssister.assists} assists this season`,
      trend: "positive",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Goal Difference",
      value: goalDifference > 0 ? `+${goalDifference}` : goalDifference,
      icon: goalDifference >= 0 ? TrendingUp : TrendingDown,
      subText: `${concededPerGame} conceded per game`,
      trend: goalDifference >= 0 ? "positive" : "negative",
      color: goalDifference >= 0 ? "text-green-600" : "text-red-600",
      bgColor: goalDifference >= 0 ? "bg-green-50" : "bg-red-50",
      iconColor: goalDifference >= 0 ? "text-green-600" : "text-red-600",
    },
    {
      title: "Win Rate",
      value: `${winRate}%`,
      icon: TrendingUp,
      subText: `${wins}W ${draws}D ${losses}L`,
      trend: winRate >= 50 ? "positive" : "negative",
      color: winRate >= 50 ? "text-emerald-600" : "text-orange-600",
      bgColor: winRate >= 50 ? "bg-emerald-50" : "bg-orange-50",
      iconColor: winRate >= 50 ? "text-emerald-600" : "text-orange-600",
    },
  ];

  if (!quickOverviewStats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 7 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cardInfo.map((card, index) => (
        <Card
          key={card.title}
          className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-transparent hover:border-l-blue-500 cursor-pointer relative overflow-hidden"
        >
          {/* Subtle background pattern */}
          <div
            className={`absolute inset-0 ${card.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
          ></div>

          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
              {card.title}
            </CardTitle>
            <div
              className={`p-2 rounded-full ${card.bgColor} group-hover:scale-110 transition-transform duration-300`}
            >
              <card.icon className={`h-4 w-4 ${card.iconColor}`} />
            </div>
          </CardHeader>

          <CardContent className="relative z-10">
            <div
              className={`text-2xl font-bold ${card.color} group-hover:scale-105 transition-transform duration-300`}
            >
              {card.value}
            </div>
            <p className="text-xs text-muted-foreground mt-1 group-hover:text-gray-600 transition-colors">
              {card.subText}
            </p>

            {/* Trend indicator */}
            {card.trend !== "neutral" && (
              <div
                className={`absolute top-2 right-2 w-2 h-2 rounded-full ${
                  card.trend === "positive" ? "bg-green-400" : "bg-red-400"
                } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              ></div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
