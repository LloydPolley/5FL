import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Games({ params }: { params: { team: string } }) {
  const supabase = await createClient();

  const { team } = await params;

  const { data: seasons } = await supabase
    .from("seasons")
    .select("*")
    .eq("team_id", team);

  if (!seasons) {
    return (
      <div className="text-red-500 text-center mt-10">
        Error loading seasons
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Seasons</h1>

      {seasons?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {seasons.map((season) => (
            <Link
              key={season.id}
              href={`/${team}/addgame/${season.id}`}
              className="bg-black text-white py-4 px-6 rounded-xl hover:bg-gray-800 transition text-center"
            >
              {season.name}
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No seasons available.</p>
      )}
    </div>
  );
}
