import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import Hero from "@/components/Hero/Hero";

export default async function Home() {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  const { data: teams } = await supabase.from("teams").select();

  return (
    <div className="wrapper">
      <Hero user={user} />
      <div className="space-y-2 mt-10 text-center">
        <h2 className="text-3xl font-bold">Browse Active Teams</h2>
        <p className="text-base text-gray-600">
          Pick a team to view its matches, stats, and performance.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-start">
        {teams?.map((team) => (
          <Link
            key={team.id}
            href={`/team/${team.id}`}
            className="min-h-80 widget rounded-lg relative z-10"
          >
            <div className="flex items-center p-2.5">
              <div className="px-1">
                <span className="block w-2.5 h-2.5 rounded-full bg-[#ff605c]" />
              </div>
              <div className="px-1">
                <span className="block w-2.5 h-2.5 rounded-full bg-[#ffbd44]" />
              </div>
              <div className="px-1">
                <span className="block w-2.5 h-2.5 rounded-full bg-[#00ca4e]" />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center h-[calc(254px-36px)] px-4 text-gray-800 text-center">
              <h3 className="text-lg font-semibold mb-2">{team.name}</h3>
              <p className="text-sm font-medium absolute bottom-3 right-4">
                View Team
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
