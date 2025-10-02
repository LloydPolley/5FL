import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Shield,
  Calendar,
  MapPin,
  User,
  Trophy,
  Users,
  Target,
} from "lucide-react";
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
      {/* Main Team Banner */}
      <div className="relative overflow-hidden rounded-xl">
        {/* Content */}
        <div className="relative p-6 pb-0">
          <div className="flex items-start justify-between flex-col lg:flex-row gap-6">
            {/* Left Content */}
            <div className="flex flex-col space-y-6 flex-1">
              {/* Team Header */}
              <div className="flex items-center space-x-4 md:space-x-6">
                <div className="relative">
                  <div className="size-16 md:size-24 black backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <Shield className="w-8 h-8 md:w-12 md:h-12 drop-shadow-lg" />
                  </div>
                  {/* Success indicator */}
                  <div className="absolute -top-1 -right-1 size-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Trophy className="w-3 h-3" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h1 className="text-3xl md:text-5xl font-bold">
                    {teamName || "Fulham Ballers"}
                  </h1>
                </div>
              </div>
            </div>

            {/* Right Content - League Badge */}
            <div className="flex flex-col items-center lg:items-end space-y-4 m-auto">
              {/* Quick Stats */}
              <div className="flex space-x-4 text-center">
                <div className="backdrop-blur-sm rounded-lg min-w-[60px]">
                  <p className="text-xs  uppercase tracking-wide">Seasons</p>
                  <p className="text-lg font-bold">{seasons?.length || 0}</p>
                </div>
                <div className="backdrop-blur-sm rounded-lg min-w-[60px]">
                  <p className="text-xs  uppercase tracking-wide">Active</p>
                  <p className="text-lg font-bold">
                    {activeSeason ? "✓" : "✗"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seasons Navigation */}
      <div className="shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 text-lg">
                Season History
              </h3>
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
                const isRecent = index < 3; // Mark first 3 as recent

                return (
                  <Link
                    key={season.id}
                    href={`/team/${team_id}?season_id=${season.id}`}
                    className="inline-block group"
                  >
                    <Badge
                      variant={isActive ? "default" : "outline"}
                      className={`
                        cursor-pointer transition-all duration-300 px-4 py-2 relative
                        ${
                          isActive
                            ? "bg-blue-600  shadow-lg scale-105 ring-2 ring-blue-200"
                            : "hover:bg-blue-50 hover:border-blue-300 hover:scale-105"
                        }
                        ${
                          isRecent && !isActive
                            ? "border-blue-200 bg-blue-25"
                            : ""
                        }
                      `}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{season.name}</span>
                        {isActive && (
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        )}
                        {isRecent && !isActive && (
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        )}
                      </div>

                      {/* Tooltip-like hover effect */}
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900  text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                        {isActive
                          ? "Current Season"
                          : isRecent
                          ? "Recent Season"
                          : "View Season"}
                      </div>
                    </Badge>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="w-12 h-12 mx-auto text-gray-300 mb-3" />
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
