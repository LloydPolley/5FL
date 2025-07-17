"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function createSeason(
  currentState: { message: string },
  formData: FormData
): Promise<{ message: string }> {
  const supabase = await createClient();

  const seasonName = formData.get("seasonName") as string;
  const team_id = formData.get("teamId") as string;

  const { error, data } = await supabase
    .from("seasons")
    .insert({
      name: seasonName,
      team_id: team_id,
    })
    .select();

  if (error || !data) {
    console.log("Team creation error: ", error);
    return { message: "Failed to create teeam" + (error?.message || "") };
  }

  revalidatePath("/");
  redirect("/");
}
