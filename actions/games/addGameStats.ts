"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addGameStats(formData: {
  appearance: boolean;
  gk: number;
  assists: number;
  goals: number;
  game_id: string;
  user_id: string;
}): Promise<{ message: string; success?: false } | { success: true }> {
  const supabase = await createClient();

  const { appearance, game_id, gk, assists, goals, user_id } = formData;

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
