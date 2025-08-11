import { Badge } from "@/components/ui/badge";
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
    <div className="space-y-4">
      {/* Main Team Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white rounded-xl shadow-2xl">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-40 translate-y-40"></div>
        </div>

        {/* Content */}
        <div className="relative p-6 md:p-8">
          <div className="flex items-start justify-between flex-col lg:flex-row gap-6">
            {/* Left Content */}
            <div className="flex flex-col space-y-6 flex-1">
              {/* Team Header */}
              <div className="flex items-center space-x-4 md:space-x-6">
                <div className="relative">
                  <div className="w-16 h-16 md:w-24 md:h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shrink-0 ring-2 ring-white/20">
                    <Shield className="w-8 h-8 md:w-12 md:h-12 text-white drop-shadow-lg" />
                  </div>
                  {/* Success indicator */}
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center ring-2 ring-white/20">
                    <Trophy className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                    {teamName || "Fulham Ballers"}
                  </h1>
                  <p className="text-blue-100 text-sm md:text-base font-medium">
                    Est. {founded} • Professional Football Club
                  </p>
                </div>
              </div>

              {/* Team Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-blue-50">
                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 hover:bg-white/15 transition-all duration-300">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-200 uppercase tracking-wide">
                      Manager
                    </p>
                    <p className="font-semibold">{manager}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 hover:bg-white/15 transition-all duration-300">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-200 uppercase tracking-wide">
                      Home Ground
                    </p>
                    <p className="font-semibold">{homeGround}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 hover:bg-white/15 transition-all duration-300">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-200 uppercase tracking-wide">
                      Founded
                    </p>
                    <p className="font-semibold">{founded}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - League Badge */}
            <div className="flex flex-col items-center lg:items-end space-y-4">
              <Badge className="bg-white text-blue-900 border-0 px-4 py-2 text-sm font-semibold shadow-lg hover:bg-blue-50 transition-colors">
                <Trophy className="w-4 h-4 mr-2" />
                {league || "Premier League"}
              </Badge>

              {/* Quick Stats */}
              <div className="flex space-x-4 text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 min-w-[60px]">
                  <p className="text-xs text-blue-200 uppercase tracking-wide">
                    Seasons
                  </p>
                  <p className="text-lg font-bold">{seasons?.length || 0}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 min-w-[60px]">
                  <p className="text-xs text-blue-200 uppercase tracking-wide">
                    Active
                  </p>
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
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
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
                            ? "bg-blue-600 text-white shadow-lg scale-105 ring-2 ring-blue-200"
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
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
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
    </div>
  );
}
