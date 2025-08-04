"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export type FormState = {
  gameId?: string;
  message?: string;
};

export async function createGame({
  season_id,
  opponent_name,
  team_score,
  opponent_score,
  team_id,
  gameId,
  date,
}: {
  season_id: string;
  opponent_name: string;
  team_score: number;
  opponent_score: number;
  team_id: string;
  gameId?: string;
  date: string;
}): Promise<FormState> {
  const supabase = await createClient();

  let response;

  if (gameId) {
    response = await supabase
      .from("games")
      .update({
        opponent: opponent_name,
        opponent_score,
        team_score,
        date,
      })
      .eq("id", gameId)
      .select()
      .single();
  } else {
    console.log("else");
    response = await supabase
      .from("games")
      .insert({
        team_id,
        season_id,
        opponent: opponent_name,
        opponent_score,
        team_score,
        date,
      })
      .select()
      .single();
  }

  const { error, data: gameData } = response;

  if (error || !gameData) {
    console.log("error", error);
    return {
      message: gameId ? "Failed to update game" : "Failed to create game",
    };
  }

  if (!gameId) {
    await addAllPlayers({ team_id, season_id, game_id: gameData.id, date });
  }

  // revalidatePath(`/${team_id}/games`);
  redirect(`/create/game/players?game_id=${gameData.id}`);
}

const addAllPlayers = async ({
  team_id,
  season_id,
  game_id,
  date,
}: {
  team_id: string;
  season_id: string;
  game_id: string;
  date: string;
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
        date,
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
