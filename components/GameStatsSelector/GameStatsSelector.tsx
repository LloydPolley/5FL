"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Calendar, Trophy, Users, Target, Award } from "lucide-react";
import { formatDate } from "@/lib/utils";

type GameData = {
  id: string | number;
  date: string;
  team_score?: number;
  opponent_score?: number;
  opponent: string;
  venue?: string;
  playerStats: any[];
};

type Header = {
  key: string;
  label: string;
  align?: "left" | "center" | "right";
};

type GameStatsSelectorProps = {
  games: GameData[];
  headers: Header[];
  season?: any;
};

export default function GameStatsSelector({
  games,
  headers,
  season,
}: GameStatsSelectorProps) {
  if (!games || games.length === 0) {
    return (
      <Card className="bg-gray-50/50">
        <CardContent className="py-12">
          <div className="text-center text-gray-500">
            <Trophy className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No games yet</h3>
            <p className="text-sm">
              Game statistics will appear here once matches are played
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-blue-600" />
              Game Statistics
            </CardTitle>
            <div className="text-sm text-gray-500">
              {games.length} games total
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Carousel
            opts={{
              align: "start",
              loop: false,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {games.map((game) => {
                // Game result calculation
                let result = "-";
                let color = "bg-gray-400 text-white";

                if (
                  game.team_score !== undefined &&
                  game.opponent_score !== undefined
                ) {
                  if (game.team_score > game.opponent_score) {
                    result = "W";
                    color = "bg-green-500 text-white";
                  } else if (game.team_score < game.opponent_score) {
                    result = "L";
                    color = "bg-red-500 text-white";
                  } else {
                    result = "D";
                    color = "bg-yellow-500 text-white";
                  }
                }

                // Player performance calculations
                const playersWhoPlayed =
                  game.playerStats?.filter((p) => p.appearance) || [];
                const topScorer = playersWhoPlayed.reduce(
                  (top, player) =>
                    (player.goals || 0) > (top?.goals || 0) ? player : top,
                  playersWhoPlayed[0]
                );
                const topAssister = playersWhoPlayed.reduce(
                  (top, player) =>
                    (player.assists || 0) > (top?.assists || 0) ? player : top,
                  playersWhoPlayed[0]
                );

                // Total stats
                const totalGoals =
                  game.playerStats?.reduce(
                    (sum, player) => sum + (player.goals || 0),
                    0
                  ) || 0;
                const totalAssists =
                  game.playerStats?.reduce(
                    (sum, player) => sum + (player.assists || 0),
                    0
                  ) || 0;

                return (
                  <CarouselItem
                    key={game.id}
                    className="pl-2 md:pl-4 basis-full"
                  >
                    <div className="border-1 border-gray-200 bg-white shadow-sm">
                      {/* Game Header */}
                      <div className="p-4 border-b border-gray-100">
                        <div className="flex items-center justify-between mb-3">
                          <div
                            className={`px-3 py-1 rounded-full text-sm font-bold ${color}`}
                          >
                            {result}
                          </div>
                          <div className="text-sm text-gray-500 font-medium">
                            {formatDate(game.date)}
                          </div>
                        </div>

                        {/* Teams and Score */}
                        <div className="text-center space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-gray-800">
                              Ballers
                            </span>
                            <span className="font-semibold text-gray-800">
                              {game.opponent}
                            </span>
                          </div>

                          {game.team_score !== undefined &&
                            game.opponent_score !== undefined && (
                              <div className="text-3xl font-bold text-gray-900">
                                {game.team_score} - {game.opponent_score}
                              </div>
                            )}
                        </div>
                      </div>

                      {/* Mini Player Stats Table */}
                      <div className="p-4">
                        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
                          <Users className="h-4 w-4" />
                          Player Performance
                        </div>

                        {playersWhoPlayed.length > 0 ? (
                          <div className="space-y-2">
                            {/* Table Header */}
                            <div className="grid grid-cols-4 gap-2 text-xs font-medium text-gray-500 pb-2 border-b border-gray-200">
                              <div className="text-left">Player</div>
                              <div className="text-center">G</div>
                              <div className="text-center">A</div>
                              <div className="text-center">GK</div>
                            </div>

                            {/* Player Rows - Show top 5 performers */}
                            {playersWhoPlayed
                              .sort(
                                (a, b) =>
                                  (b.goals || 0) +
                                  (b.assists || 0) -
                                  ((a.goals || 0) + (a.assists || 0))
                              )
                              .slice(0, 5)
                              .map((player, playerIndex) => {
                                const isTopScorer =
                                  player.id === topScorer?.id &&
                                  (player.goals || 0) > 0;
                                const isTopAssister =
                                  player.id === topAssister?.id &&
                                  (player.assists || 0) > 0;

                                return (
                                  <div
                                    key={player.id || playerIndex}
                                    className="grid grid-cols-4 gap-2 text-sm py-1"
                                  >
                                    <div className="text-left font-medium text-gray-800 truncate flex items-center gap-1">
                                      {player.name}
                                      {(isTopScorer || isTopAssister) && (
                                        <div className="flex gap-1">
                                          {isTopScorer && (
                                            <Target className="h-3 w-3 text-green-500" />
                                          )}
                                          {isTopAssister && (
                                            <Award className="h-3 w-3 text-blue-500" />
                                          )}
                                        </div>
                                      )}
                                    </div>
                                    <div
                                      className={`text-center ${
                                        (player.goals || 0) > 0
                                          ? "font-semibold text-green-600"
                                          : "text-gray-500"
                                      }`}
                                    >
                                      {player.goals || 0}
                                    </div>
                                    <div
                                      className={`text-center ${
                                        (player.assists || 0) > 0
                                          ? "font-semibold text-blue-600"
                                          : "text-gray-500"
                                      }`}
                                    >
                                      {player.assists || 0}
                                    </div>
                                    <div
                                      className={`text-center ${
                                        (player.gk || 0) > 0
                                          ? "font-semibold text-purple-600"
                                          : "text-gray-400"
                                      }`}
                                    >
                                      {player.gk || 0}
                                    </div>
                                  </div>
                                );
                              })}

                            {/* Show more indicator */}
                            {playersWhoPlayed.length > 5 && (
                              <div className="text-xs text-gray-400 text-center pt-2 border-t border-gray-100">
                                +{playersWhoPlayed.length - 5} more players
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="text-center py-4 text-gray-400 text-sm">
                            No player data available
                          </div>
                        )}

                        {/* Quick Summary Stats */}
                        <div className="mt-4 pt-3 border-t border-gray-100">
                          <div className="grid grid-cols-3 gap-3 text-center">
                            <div>
                              <p className="text-lg font-bold text-green-600">
                                {totalGoals}
                              </p>
                              <p className="text-xs text-gray-500">
                                Total Goals
                              </p>
                            </div>
                            <div>
                              <p className="text-lg font-bold text-blue-600">
                                {totalAssists}
                              </p>
                              <p className="text-xs text-gray-500">
                                Total Assists
                              </p>
                            </div>
                            <div>
                              <p className="text-lg font-bold text-purple-600">
                                {playersWhoPlayed.length}
                              </p>
                              <p className="text-xs text-gray-500">Players</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </CardContent>
      </Card>
    </div>
  );
}
