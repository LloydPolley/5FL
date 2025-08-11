"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Calendar,
  Trophy,
  Users,
  Target,
  Award,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

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

type GameStatsSelectorMiniProps = {
  games: GameData[];
  headers: Header[];
  season?: any;
};

export default function GameStatsSelectorMini({
  games,
  headers,
  season,
}: GameStatsSelectorMiniProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Fix hydration issue
  useEffect(() => {
    setMounted(true);
  }, []);

  const formatDate = (dateString: string) => {
    if (!mounted) return ""; // Return empty during SSR
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });
  };

  if (!games || games.length === 0) {
    return (
      <Card className="h-fit">
        <CardContent className="py-8">
          <div className="text-center text-gray-500">
            <Trophy className="w-12 h-12 mx-auto text-gray-300 mb-3" />
            <h4 className="font-semibold mb-1">No games yet</h4>
            <p className="text-xs">Games will appear here</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentGame = games[currentIndex];
  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex < games.length - 1;

  const goToPrevious = () => {
    if (canGoBack) setCurrentIndex(currentIndex - 1);
  };

  const goToNext = () => {
    if (canGoForward) setCurrentIndex(currentIndex + 1);
  };

  const getGameResult = (game: GameData) => {
    if (game.team_score !== undefined && game.opponent_score !== undefined) {
      if (game.team_score > game.opponent_score)
        return { result: "W", color: "bg-green-500 text-white" };
      if (game.team_score < game.opponent_score)
        return { result: "L", color: "bg-red-500 text-white" };
      return { result: "D", color: "bg-yellow-500 text-white" };
    }
    return { result: "-", color: "bg-gray-400 text-white" };
  };

  const getTopPerformers = (playerStats: any[]) => {
    const playersWhoPlayed = playerStats.filter((p) => p.appearance);
    const topScorer = playersWhoPlayed.reduce(
      (top, player) => ((player.goals || 0) > (top?.goals || 0) ? player : top),
      playersWhoPlayed[0]
    );
    const topAssister = playersWhoPlayed.reduce(
      (top, player) =>
        (player.assists || 0) > (top?.assists || 0) ? player : top,
      playersWhoPlayed[0]
    );

    return { topScorer, topAssister };
  };

  const { result, color } = getGameResult(currentGame);
  const { topScorer, topAssister } = getTopPerformers(
    currentGame.playerStats || []
  );
  const playersWhoPlayed =
    currentGame.playerStats?.filter((p) => p.appearance) || [];

  return (
    <Card className="h-fit">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Calendar className="h-4 w-4 text-blue-600" />
            Game Stats
          </CardTitle>
          <div className="flex items-center gap-1">
            <button
              onClick={goToPrevious}
              disabled={!canGoBack}
              className={`p-1 rounded transition-colors ${
                canGoBack
                  ? "text-gray-700 hover:bg-gray-100"
                  : "text-gray-300 cursor-not-allowed"
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-xs text-gray-500 min-w-[40px] text-center">
              {currentIndex + 1}/{games.length}
            </span>
            <button
              onClick={goToNext}
              disabled={!canGoForward}
              className={`p-1 rounded transition-colors ${
                canGoForward
                  ? "text-gray-700 hover:bg-gray-100"
                  : "text-gray-300 cursor-not-allowed"
              }`}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Game Header */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className={`px-2 py-1 rounded-md text-xs font-bold ${color}`}>
              {result}
            </div>
            <div className="text-xs text-gray-500">
              {formatDate(currentGame.date)}
            </div>
          </div>

          {/* Teams and Score */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-gray-800">Ballers</span>
              <span className="font-medium text-gray-800">
                {currentGame.opponent}
              </span>
            </div>

            {currentGame.team_score !== undefined &&
              currentGame.opponent_score !== undefined && (
                <div className="text-2xl font-bold text-gray-900">
                  {currentGame.team_score} - {currentGame.opponent_score}
                </div>
              )}
          </div>
        </div>

        {/* Quick Summary Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="text-center p-2 bg-green-50 rounded-lg">
            <p className="text-lg font-bold text-green-600">
              {currentGame.playerStats?.reduce(
                (sum, player) => sum + (player.goals || 0),
                0
              ) || 0}
            </p>
            <p className="text-xs text-gray-500">Goals</p>
          </div>
          <div className="text-center p-2 bg-blue-50 rounded-lg">
            <p className="text-lg font-bold text-blue-600">
              {currentGame.playerStats?.reduce(
                (sum, player) => sum + (player.assists || 0),
                0
              ) || 0}
            </p>
            <p className="text-xs text-gray-500">Assists</p>
          </div>
          <div className="text-center p-2 bg-purple-50 rounded-lg">
            <p className="text-lg font-bold text-purple-600">
              {playersWhoPlayed.length}
            </p>
            <p className="text-xs text-gray-500">Players</p>
          </div>
        </div>

        {/* Top Performers */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Users className="h-4 w-4" />
            Top Performers
          </div>

          {playersWhoPlayed.length > 0 ? (
            <div className="space-y-2">
              {/* Top Scorer */}
              {topScorer && (topScorer.goals || 0) > 0 && (
                <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Target className="h-3 w-3 text-green-500" />
                    <span className="text-sm font-medium text-gray-800">
                      {topScorer.name}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-green-600">
                    {topScorer.goals} goal{topScorer.goals !== 1 ? "s" : ""}
                  </div>
                </div>
              )}

              {/* Top Assister */}
              {topAssister &&
                (topAssister.assists || 0) > 0 &&
                topAssister.id !== topScorer?.id && (
                  <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Award className="h-3 w-3 text-blue-500" />
                      <span className="text-sm font-medium text-gray-800">
                        {topAssister.name}
                      </span>
                    </div>
                    <div className="text-sm font-bold text-blue-600">
                      {topAssister.assists} assist
                      {topAssister.assists !== 1 ? "s" : ""}
                    </div>
                  </div>
                )}

              {/* Goalkeeper */}
              {(() => {
                const goalkeeper = playersWhoPlayed.find(
                  (player) => (player.gk || 0) > 0
                );
                return goalkeeper ? (
                  <div className="flex items-center justify-between p-2 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-800">
                        {goalkeeper.name}
                      </span>
                    </div>
                    <div className="text-xs text-purple-600 font-medium">
                      Goalkeeper
                    </div>
                  </div>
                ) : null;
              })()}

              {/* No standout performers message */}
              {(!topScorer || (topScorer.goals || 0) === 0) &&
                (!topAssister || (topAssister.assists || 0) === 0) &&
                !playersWhoPlayed.find((player) => (player.gk || 0) > 0) && (
                  <div className="text-center py-3 text-gray-400 text-sm">
                    No standout performances
                  </div>
                )}
            </div>
          ) : (
            <div className="text-center py-3 text-gray-400 text-sm">
              No player data available
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
