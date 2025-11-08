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
      <div className="overflow-x-auto">
        <Table>
          <TableCaption className="text-sm text-muted-foreground py-3">
            Player Performance Statistics
          </TableCaption>
          <TableHeader>
            <TableRow className="bg-secondary">
              {enhancedHeaders.map(({ key, label, align, points }) => (
                <TableHead
                  key={key}
                  className={`font-semibold ${
                    align === "left"
                      ? "text-left"
                      : align === "right"
                      ? "text-right"
                      : "text-center"
                  } py-3`}
                >
                  <div className="flex flex-col items-center justify-end h-5">
                    <p className="text-xs text-center">{points || "W"}</p>
                  </div>
                  <div className="flex flex-col items-center justify-end">
                    <p>{label}</p>
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
                  className={`group duration-200 ${
                    isTopPerformer ? "bg-amber-50/30" : ""
                  }`}
                >
                  {enhancedHeaders.map(({ key, align }) => {
                    let content: any = player[key as keyof Player];

                    if (content === undefined && player.users) {
                      content = player.users[key];
                    }

                    if ((key === "name" || key === "player") && !content) {
                      content =
                        player.name || player.users?.name || "Unknown Player";
                    }

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
                          {isPlayerName && (
                            <div className="flex items-center gap-2 justify-start w-full">
                              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold">
                                {idx + 1}
                              </div>
                              <span>{content}</span>
                            </div>
                          )}

                          {/* Goals with highlighting */}
                          {!isPlayerName && isGoals && (
                            <div className="flex items-center gap-1 justify-center">
                              <span className="font-semibold">{content}</span>
                            </div>
                          )}

                          {/* Assists with highlighting */}
                          {!isPlayerName && isAssists && (
                            <div className="flex items-center gap-1 justify-center">
                              <span className="font-semibold">{content}</span>
                            </div>
                          )}

                          {/* Points with emphasis */}
                          {!isPlayerName && isPoints && (
                            <span className="font-bold">{content}</span>
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
        <div className="px-4 py-3 border-t text-sm">
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
