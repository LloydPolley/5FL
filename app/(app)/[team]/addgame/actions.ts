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
  const season_id = formData.get("season_id") as string;

  const { error, data: gameData } = await supabase
    .from("games")
    .insert({
      team_id,
      season_id,
      opponent: opponantName,
      opponent_score,
      team_score,
      date: new Date(),
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

  console.log("cookieId", cookieId);

  const { error, data } = await supabase
    .from("game_players")
    .insert({
      appearance,
      game_id: cookieId?.value,
      gk,
      assists,
      goals,
      user_id,
      date: new Date(),
    })
    .select()
    .limit(1)
    .single();

  console.log("aded game", data, error);

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
