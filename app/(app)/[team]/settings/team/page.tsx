import CreateTeamForm from "./components/CreateTeamForm";
import { createClient } from "@/utils/supabase/server";

export default async function TeamSettings({
  params,
}: {
  params: { team: string };
}) {
  const supabase = await createClient();
  const { data: users, error: teamError } = await supabase
    .from("users")
    .select("*)")
    .eq("team_id", params.team);

  if (teamError || !users) {
    console.log("Team creation error: ", teamError);
    return { message: "Failed to create teeam" + (teamError?.message || "") };
  }

  console.log("teamData", users);

  return <CreateTeamForm teamId={params.team} users={users} />;
}
