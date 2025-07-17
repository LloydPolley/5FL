"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function createTeam(
  currentState: { message: string },
  formData: FormData
): Promise<{ message: string }> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { message: "User not authed" };
  }

  const teamName = formData.get("teamName") as string;
  const players = formData.getAll("players[]") as string[];

  const { error: teamError, data: teamData } = await supabase
    .from("teams")
    .insert({
      name: teamName,
      manager: user?.id,
    })
    .select()
    .single();

  if (teamError || !teamData) {
    console.log("Team creation error: ", teamError);
    return { message: "Failed to create teeam" + (teamError?.message || "") };
  }

  const playerCreationResults = await Promise.all(
    players.map(async (player) => {
      const { error } = await supabase.from("users").insert({
        name: player,
        team_id: teamData.id,
      });
      return error;
    })
  );

  await supabase
    .from("users")
    .update({ team_id: teamData.id })
    .eq("UID", user.id);

  const playerErrors = playerCreationResults.filter(Boolean);

  if (playerErrors.length > 0) {
    console.log("Some players failed to create:", playerErrors);
    return { message: "Failed to create some players" };
  }

  revalidatePath("/");
  redirect("/");
}
