import { createClient } from "@/utils/supabase/server";
import { getUser } from "@/utils/users/getUser";

import GameWrapper from "./components/GameWrapper";

export default async function Games() {
  const supabase = await createClient();
  const user = await getUser();

  const { data } = await supabase
    .from("users")
    .select("name, id")
    .eq("team_id", user.team_id);

  if (!data) {
    return <div>Error loading team members</div>;
  }

  return <GameWrapper user={user} teamMembers={data} />;
}
