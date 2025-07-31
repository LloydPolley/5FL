"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export type FormState = {
  gameId?: string;
  message?: string;
};

export async function createGame(
  currentState: FormState,
  formData: FormData
): Promise<FormState> {
  const supabase = await createClient();

  const opponentName = formData.get("opponentName") as string;
  const team_id = formData.get("team_id") as string;
  const team_score = Number(formData.get("team_score"));
  const opponent_score = Number(formData.get("opponent_score"));
  const season_id = formData.get("season_id") as string;
  const gameId = formData.get("game_id") as string;

  let response;

  if (gameId) {
    response = await supabase
      .from("games")
      .update({
        opponent: opponentName,
        opponent_score,
        team_score,
      })
      .eq("id", gameId)
      .select()
      .single();
  } else {
    response = await supabase
      .from("games")
      .insert({
        team_id,
        season_id,
        opponent: opponentName,
        opponent_score,
        team_score,
        date: new Date(),
      })
      .select()
      .single();
  }

  const { error, data: gameData } = response;

  if (error || !gameData) {
    return {
      message: gameId ? "Failed to update game" : "Failed to create game",
    };
  }

  if (!gameId) {
    await addAllPlayers({ team_id, season_id, game_id: gameData.id });
  }

  // revalidatePath(`/${team_id}/games`);
  redirect(`/create/game/players?game_id=${gameData.id}`);
}

const addAllPlayers = async ({
  team_id,
  season_id,
  game_id,
}: {
  team_id: string;
  season_id: string;
  game_id: string;
}) => {
  const supabase = await createClient();

  const { data } = await supabase
    .from("users")
    .select("name, id")
    .eq("team_id", team_id);

  if (!data) {
    console.log("no data");
    return {
      message: "Failed to add all players",
    };
  }

  const playerCreationResults = await Promise.all(
    data.map(async (player) => {
      const { error } = await supabase.from("game_players").insert({
        appearance: false,
        game_id,
        gk: 0,
        assists: 0,
        goals: 0,
        user_id: player.id,
        date: new Date(),
      });
      return error;
    })
  );

  const playerErrors = playerCreationResults.filter(Boolean);

  console.log("playerErrors", playerErrors);

  if (playerErrors.length > 0) {
    return {
      message: "Failed to add some players",
    };
  }

  console.log("all players added");
  return {
    message: "All players added",
  };
};
