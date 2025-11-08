import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Shield, Calendar, Trophy } from "lucide-react";
import Link from "next/link";

export default function TeamBanner({
  teamName,
  manager,
  homeGround,
  founded,
  league,
  seasons,
  team_id,
  activeSeason,
}: {
  teamName: string;
  manager: string;
  homeGround: string;
  founded: string;
  league: string;
  seasons: any;
  team_id: string;
  activeSeason: any;
}) {
  return (
    <Card className="space-y-4">
      <div className="relative overflow-hidden rounded-xl">
        <div className="relative p-6 pb-0">
          <div className="flex items-start justify-between flex-col lg:flex-row gap-6">
            <div className="flex flex-col space-y-6 flex-1">
              <div className="flex items-center space-x-4 md:space-x-6">
                <div className="space-y-2">
                  <h1 className="text-3xl md:text-5xl font-bold">
                    {teamName || "Fulham Ballers"}
                  </h1>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center lg:items-end space-y-4 m-auto">
              <div className="flex space-x-4 text-center">
                <div className="backdrop-blur-sm rounded-lg min-w-[60px]">
                  <p className="text-xs uppercase tracking-wide">Seasons</p>
                  <p className="text-lg font-bold">{seasons?.length || 0}</p>
                </div>
                <div className="backdrop-blur-sm rounded-lg min-w-[60px]">
                  <p className="text-xs uppercase tracking-wide">Active</p>
                  <p className="text-lg font-bold">
                    {activeSeason ? "✓" : "✗"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="shadow-sm">
        <div className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-lg">Season History</h3>
            </div>
            <Badge variant="outline" className="text-xs">
              {seasons?.length || 0} total seasons
            </Badge>
          </div>
        </div>

        <div className="p-6">
          {seasons && seasons.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {seasons.map((season: any, index: number) => {
                const isActive = season.id === activeSeason?.id;
                const isRecent = index < 3;
                return (
                  <Link
                    key={season.id}
                    href={`/team/${team_id}?season_id=${season.id}`}
                    className="inline-block group"
                  >
                    <Badge
                      variant={isActive ? "default" : "outline"}
                      className={`cursor-pointer transition-all duration-300 px-4 py-2 relative ${
                        isActive ? "shadow-lg scale-105" : "hover:scale-105"
                      } ${isRecent && !isActive ? "" : ""}`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{season.name}</span>
                      </div>
                    </Badge>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 mx-auto mb-3" />
              <p className="text-lg font-medium">No seasons available</p>
              <p className="text-sm">
                Season data will appear here once created
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
