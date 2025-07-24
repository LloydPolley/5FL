import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { getUser } from "@/utils/users/getUser";

export default async function Home() {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  console.log("user", user);
  const { data: teams, error } = await supabase.from("teams").select();

  return (
    <>
      {!user && (
        <div className="mx-auto text-center space-y-6 mt-6 min-h-[calc(65vh)] flex flex-col justify-center  rounded-2xl ">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
            Track Every Game,
            <br />
            Every Player.
          </h1>
          <p className="text-base sm:text-lg text-gray-700 max-w-xl mx-auto w-[calc(100%-4rem)]">
            Stay on top of your team’s progress, <br /> performance and stats
            all in one place.
          </p>
          <div className="flex gap-4 justify-center">
            <a href="/signup" className="main-btn inline-block">
              Create Team
            </a>
            <a href="/login" className="main-btn inline-block">
              Login
            </a>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mx-auto">
        {teams?.map((team) => (
          <Link key={team.id} href={`/${team.id}`}>
            <div className="group text-gray-900 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition flex flex-col aspect-square overflow-hidden">
              <div className="flex-1 flex items-center justify-center px-4 pt-4">
                <div className="w-full h-full bg-gray-100 border border-gray-200 rounded-xl flex items-center justify-center">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-xl font-bold text-gray-700">
                    {team.name[0]}
                  </div>
                </div>
              </div>
              <div className="p-4 flex flex-col items-start gap-2 flex-[0.75]">
                <div className="text-lg font-semibold">{team.name}</div>
                <p className="text-sm text-gray-600">
                  {team.stats || "No stats yet"}
                </p>
                <span className="main-btn mt-auto">View Team</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
