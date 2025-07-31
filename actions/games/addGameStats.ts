"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addGameStats(
  currentState: { message?: string; success?: boolean },
  formData: FormData
): Promise<{ message: string; success?: false } | { success: true }> {
  const supabase = await createClient();

  const user_id = formData.get("user_id") as string;
  const game_id = formData.get("game_id") as string;
  const goals = formData.get("goals") as string;
  const assists = formData.get("assists") as string;
  const gk = formData.get("gk") as string;
  const appearance = formData.get("appearance") === "true";

  const { error, data } = await supabase
    .from("game_players")
    .update({
      appearance,
      game_id,
      gk,
      assists,
      goals,
      user_id,
    })
    .eq("user_id", user_id)
    .eq("game_id", game_id)
    .select();

  console.log("user_id", user_id);
  console.log("game_id", game_id);

  console.log("add user", data, error);

  if (error || !data) {
    return {
      message: `Failed to add player stats, ${error?.message}`,
      success: false,
    };
  }

  revalidatePath(`/`);

  return {
    success: true,
  };
}
