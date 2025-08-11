import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trophy, Target, Users, Award, Calendar } from "lucide-react";

type Header = {
  key: string;
  label: string;
  align?: "left" | "center" | "right";
  icon?: React.ComponentType<{ className?: string }>;
};

type Player = {
  user_id?: string;
  id?: string;
  name: string;
  goals: number;
  assists: number;
  gk: number;
  points: number;
  users?: Record<string, any>;
  [key: string]: any; // This fixes the TypeScript error
};

type StatsTableCardProps = {
  headers: Header[];
  players: Player[];
  date?: string;
  team_score?: number;
  opponent_score?: number;
  opponent?: string;
};

export default function StatsTableCard({
  headers,
  players,
  date,
  team_score,
  opponent_score,
  opponent,
}: StatsTableCardProps) {
  // Enhanced headers with icons and better alignment
  const enhancedHeaders = headers.map((header) => ({
    ...header,
    align: header.key === "name" || header.key === "player" ? "left" : "center",
    icon: getHeaderIcon(header.key),
  }));

  // Sort players by points (descending) for better UX
  const sortedPlayers = [...players].sort(
    (a, b) => (b.points || 0) - (a.points || 0)
  );

  // Get top performer for highlighting
  const topScorer = players.reduce(
    (top, player) => ((player.goals || 0) > (top?.goals || 0) ? player : top),
    players[0]
  );
  const topAssister = players.reduce(
    (top, player) =>
      (player.assists || 0) > (top?.assists || 0) ? player : top,
    players[0]
  );

  return (
    <Card className="overflow-hidden shadow-lg">
      {/* Match Header */}
      {team_score !== undefined && opponent_score !== undefined && (
        <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative p-4">
            <div className="flex items-center justify-center mb-2">
              <Calendar className="h-4 w-4 mr-2" />
              <p className="text-sm font-medium tracking-wide">
                {new Date(date || "").toLocaleDateString("en-GB", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="grid grid-cols-3 items-center text-center">
              <div className="flex flex-col">
                <span className="text-sm opacity-90">Fulham</span>
                <span className="font-bold">Ballers</span>
              </div>
              <div className="flex flex-col">
                <div className="text-2xl font-bold mb-1">
                  {team_score} - {opponent_score}
                </div>
                <div
                  className={`text-xs px-2 py-1 rounded-full ${
                    team_score > opponent_score
                      ? "bg-green-500/20 text-green-100"
                      : team_score < opponent_score
                      ? "bg-red-500/20 text-red-100"
                      : "bg-yellow-500/20 text-yellow-100"
                  }`}
                >
                  {team_score > opponent_score
                    ? "WIN"
                    : team_score < opponent_score
                    ? "LOSS"
                    : "DRAW"}
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm opacity-90">vs</span>
                <span className="font-bold">{opponent || "TBD"}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableCaption className="text-sm text-muted-foreground py-3">
            Player Performance Statistics
          </TableCaption>
          <TableHeader>
            <TableRow className="bg-gray-50/80 hover:bg-gray-50">
              {enhancedHeaders.map(({ key, label, align, icon: Icon }) => (
                <TableHead
                  key={key}
                  className={`font-semibold text-gray-700 ${
                    align === "left"
                      ? "text-left"
                      : align === "right"
                      ? "text-right"
                      : "text-center"
                  } py-3`}
                >
                  <div className="flex items-center gap-2 justify-center">
                    {Icon && <Icon className="h-4 w-4" />}
                    <span>{label}</span>
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedPlayers.map((player, idx) => {
              const isTopScorer =
                player.id === topScorer?.id && (player.goals || 0) > 0;
              const isTopAssister =
                player.id === topAssister?.id && (player.assists || 0) > 0;
              const isTopPerformer = idx === 0 && (player.points || 0) > 0;

              return (
                <TableRow
                  key={player.id || player.user_id || idx}
                  className={`group hover:bg-blue-50/50 transition-colors duration-200 ${
                    isTopPerformer ? "bg-amber-50/30" : ""
                  }`}
                >
                  {enhancedHeaders.map(({ key, align }) => {
                    let content: any = player[key as keyof Player];

                    // Handle nested user data
                    if (content === undefined && player.users) {
                      content = player.users[key];
                    }

                    // Handle name/player field specifically
                    if ((key === "name" || key === "player") && !content) {
                      content =
                        player.name || player.users?.name || "Unknown Player";
                    }

                    // Default fallback
                    if (content === undefined || content === null) {
                      content = "-";
                    }

                    const isPlayerName = key === "name" || key === "player";
                    const isGoals = key === "goals" || key === "gls";
                    const isAssists = key === "assists" || key === "asts";
                    const isPoints = key === "points";

                    return (
                      <TableCell
                        key={key}
                        className={`py-3 ${
                          align === "left"
                            ? "text-left"
                            : align === "right"
                            ? "text-right"
                            : "text-center"
                        } ${isPlayerName ? "font-medium" : ""}`}
                      >
                        <div className="flex items-center gap-2 justify-center">
                          {/* Player name with special styling */}
                          {isPlayerName && (
                            <div className="flex items-center gap-2 justify-start w-full">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                                  isTopPerformer
                                    ? "bg-amber-100 text-amber-800 ring-2 ring-amber-200"
                                    : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                {idx + 1}
                              </div>
                              <span className="group-hover:text-blue-700 transition-colors">
                                {content}
                              </span>
                              {isTopPerformer && (
                                <Trophy className="h-4 w-4 text-amber-500" />
                              )}
                            </div>
                          )}

                          {/* Goals with highlighting */}
                          {!isPlayerName && isGoals && (
                            <div className="flex items-center gap-1 justify-center">
                              <span
                                className={`font-semibold ${
                                  isTopScorer ? "text-green-600" : ""
                                }`}
                              >
                                {content}
                              </span>
                              {isTopScorer && (
                                <Target className="h-3 w-3 text-green-500" />
                              )}
                            </div>
                          )}

                          {/* Assists with highlighting */}
                          {!isPlayerName && isAssists && (
                            <div className="flex items-center gap-1 justify-center">
                              <span
                                className={`font-semibold ${
                                  isTopAssister ? "text-blue-600" : ""
                                }`}
                              >
                                {content}
                              </span>
                              {isTopAssister && (
                                <Users className="h-3 w-3 text-blue-500" />
                              )}
                            </div>
                          )}

                          {/* Points with emphasis */}
                          {!isPlayerName && isPoints && (
                            <span
                              className={`font-bold ${
                                isTopPerformer
                                  ? "text-amber-600"
                                  : "text-gray-700"
                              }`}
                            >
                              {content}
                            </span>
                          )}

                          {/* Regular content */}
                          {!isPlayerName &&
                            !isGoals &&
                            !isAssists &&
                            !isPoints && <span>{content}</span>}
                        </div>
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Summary Footer */}
      {players.length > 0 && (
        <div className="px-4 py-3 bg-gray-50 border-t text-sm text-gray-600">
          <div className="flex justify-between items-center">
            <span>{players.length} players total</span>
            <div className="flex gap-4 text-xs">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                Top Scorer
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                Top Assister
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                Top Performer
              </span>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

// Helper function to get appropriate icons for headers
function getHeaderIcon(
  key: string
): React.ComponentType<{ className?: string }> | undefined {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    goals: Target,
    gls: Target,
    assists: Users,
    asts: Users,
    points: Award,
    apps: Calendar,
  };

  return iconMap[key.toLowerCase()];
}
