import { createClient } from "@/utils/supabase/server";
import Hero from "@/components/Landing/Hero/Hero";
import TeamCards from "@/components/Landing/TeamCards/TeamCards";
import { Button } from "@/components/ui/button";
import { User, Calendar, BarChart3, Trophy } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: teams } = await supabase.from("teams").select();

  console.log("user", user);

  return (
    <>
      {/* Hero Section */}
      <Hero user={user} />

      {/* What is 5FL Section */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            What is 5FL?
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            5FL is a comprehensive football league management platform designed
            for grassroots and amateur teams. Track players, analyze
            performance, and manage your season all in one place with intuitive
            tools built specifically for football leagues.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive tools for modern football team management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Player Statistics
              </h3>
              <p className="text-gray-600">
                Track goals, assists, appearances, and performance metrics for
                every player
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Match Management
              </h3>
              <p className="text-gray-600">
                Schedule games, record results, and analyze team performance
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Performance Analytics
              </h3>
              <p className="text-gray-600">
                Visual charts and insights to improve your team's performance
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Season Overview
              </h3>
              <p className="text-gray-600">
                Monitor league standings, player rankings, and team progress
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Perfect For Section */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Perfect For
            </h2>
            <p className="text-xl text-gray-600">
              Built for everyone involved in grassroots football
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Team Managers
              </h3>
              <p className="text-gray-600">
                Organize your squad and track player development throughout the
                season
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Coaches
              </h3>
              <p className="text-gray-600">
                Make data-driven decisions with detailed analytics and
                performance insights
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                League Organizers
              </h3>
              <p className="text-gray-600">
                Manage multiple teams and competitions with comprehensive league
                tools
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Players
              </h3>
              <p className="text-gray-600">
                See your stats and track your improvement across matches and
                seasons
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Create Your Team
              </h3>
              <p className="text-gray-600">
                Set up your squad and add players with their basic information
                and positions
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Record Matches
              </h3>
              <p className="text-gray-600">
                Log results, goals, assists, and individual player performance
                after each game
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Track Progress
              </h3>
              <p className="text-gray-600">
                View analytics, monitor improvement, and make informed decisions
                for your team
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Carousel Section */}
      <section className="px-6 py-20 bg-gray-200">
        <TeamCards teams={teams} user={user} />
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Create your team and start tracking performance today
          </p>
          <Button size="lg" className="text-lg px-8 py-4 h-auto">
            <Link href="/create/team">Create Your Team</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
