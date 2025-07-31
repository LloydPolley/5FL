"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function createTeam(
  currentState: { message: string },
  formData: FormData
): Promise<{ message: string }> {
  const supabase = await createClient();

  const teamId = formData.get("teamId") as string;

  // Custom-encoded JSON list of new players (no ID)
  const playersJSON = formData.get("newPlayers") as string;
  let players: string[] = [];

  try {
    players = JSON.parse(playersJSON);
  } catch {
    return { message: "Invalid player data" };
  }

  console.log("players", players);

  const playerCreationResults = await Promise.all(
    players.map(async (player) => {
      const { error } = await supabase.from("users").insert({
        name: player,
        team_id: teamId,
      });
      return error;
    })
  );

  const playerErrors = playerCreationResults.filter(Boolean);

  if (playerErrors.length > 0) {
    return { message: "Failed to create some players" };
  }

  revalidatePath("/");
  redirect("/");
}
