"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { createClient } from "@/utils/supabase/server";

export type FormState = {
  gameId?: string;
  message?: string;
};

export async function createGame(
  currentState: FormState,
  formData: FormData
): Promise<FormState> {
  const supabase = await createClient();

  const opponantName = formData.get("opponentName") as string;
  const team_id = formData.get("team_id") as string;
  const team_score = formData.get("team_score") as string;
  const opponent_score = formData.get("opponent_score") as string;

  const { error: seasonError, data: seasonData } = await supabase
    .from("seasons")
    .select()
    .eq("team_id", team_id)
    .order("date", { ascending: false })
    .limit(1)
    .single();

  console.log("seasonData", seasonData);

  if (seasonError || !seasonData) {
    return {
      message: `Failed to find the season, create one first then add game`,
    };
  }

  const { error, data: gameData } = await supabase
    .from("games")
    .insert({
      team_id,
      season_id: seasonData.id,
      opponent: opponantName,
      opponent_score,
      team_score,
    })
    .select()
    .limit(1)
    .single();

  if (error || !gameData) {
    return {
      message: "Failed to create game",
    };
  }

  revalidatePath("/");

  (await cookies()).set("game_id", gameData.id, {});

  return {
    gameId: gameData.id,
  };
}

export type StatsType = {
  message: string;
};

export async function addStatsToGame(
  currentState: { message?: string; success?: boolean },
  formData: FormData
): Promise<{ message: string; success?: false } | { success: true }> {
  const supabase = await createClient();

  const user_id = formData.get("user_id") as string;
  const goals = formData.get("goals") as string;
  const assists = formData.get("assists") as string;
  const gk = formData.get("gk") as string;
  const appearance = formData.get("appearance") === "true";

  const cookieStore = await cookies();
  const cookieId = cookieStore.get("game_id");

  const { error, data } = await supabase
    .from("game_players")
    .insert({
      appearance,
      game_id: cookieId?.value,
      gk,
      assists,
      goals,
      user_id,
    })
    .select()
    .limit(1)
    .single();

  if (error || !data) {
    return {
      message: `Failed to add player stats, ${error?.message}`,
      success: false,
    };
  }

  revalidatePath("/");

  return {
    success: true,
  };
}
