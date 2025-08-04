"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function createTeam({
  teamId,
  players,
}: {
  teamId: string;
  players: string[];
}): Promise<{ message: string }> {
  const supabase = await createClient();

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
