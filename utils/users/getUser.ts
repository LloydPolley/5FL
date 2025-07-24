import { createClient } from "../supabase/server";

export async function getUser(): Promise<{ UID: string; team_id: string }> {
  const supabase = await createClient();

  const { data: sessionData } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("users")
    .select(`UID, name, team_id`)
    .eq("UID", sessionData?.user?.id)
    .single();

  if (error) throw new Error(error.message);

  return { UID: data?.UID, team_id: data?.team_id };
}
