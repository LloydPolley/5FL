import CreateTeamForm from "@/components/form/CreateTeamForm/CreateTeamForm";
import { createClient } from "@/utils/supabase/server";

export default async function TeamSettings() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const { data: team } = await supabase
    .from("teams")
    .select("*")
    .eq("manager", data?.user?.id)
    .single();

  console.log("team", team);

  const { data: users } = await supabase
    .from("users")
    .select("*")
    .eq("team_id", team?.id);

  return <CreateTeamForm teamId={team?.id} users={users} />;
}
