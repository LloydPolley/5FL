import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import CreateGameForm from "@/components/Forms/CreateGameForm/CreateGameForm";
import SectionTabs from "@/components/Tabs/Tabs";
import { Button } from "@/components/ui/button";

export default async function Games({
  searchParams,
}: {
  searchParams: { game_id: string };
}) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const { game_id } = await searchParams;

  const { data: userData } = await supabase
    .from("users")
    .select("*")
    .eq("UID", data?.user?.id)
    .single();

  const { team_id } = userData;

  const { data: seasons } = await supabase
    .from("seasons")
    .select("id, name")
    .eq("team_id", team_id);

  let game = null;
  if (game_id) {
    console.log("game_id", game_id);
    const { data: fetchedGame } = await supabase
      .from("games")
      .select("*")
      .eq("id", game_id)
      .single();
    game = fetchedGame;
  }

  if (!seasons) {
    return (
      <div className="text-red-500 text-center mt-10">
        Error loading seasons - create a season first <br />
        <Link className="underline" href="/create/season">
          Create Season
        </Link>
      </div>
    );
  }

  return (
    <>
      {seasons?.length ? (
        <CreateGameForm teamId={team_id} result={game} seasons={seasons} />
      ) : (
        <p className="text-gray-500">No seasons available.</p>
      )}
    </>
  );
}
