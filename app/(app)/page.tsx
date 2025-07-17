import { createClient } from "@/utils/supabase/server";
import { getUser } from "@/utils/users/getUser";

export default async function Home() {
  const supabase = await createClient();
  const user = await getUser();

  console.log("user", user);

  const { data: team } = await supabase
    .from("teams")
    .select()
    .eq("manager", user?.UID);

  console.log("team", team);

  await supabase.from("seasons").select().eq("team_id", user.team_id);

  // const { data: users } = await supabase
  //   .from("users")
  //   .select()
  //   .eq("team_id", team?.id);

  // console.log("user", users);

  return (
    <div className="h-dvh flex flex-col">
      {/* <TeamOverview team={team} users={users} seasons={seasons} /> */}
    </div>
  );
}
