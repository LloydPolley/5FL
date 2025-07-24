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

  //get team_id from getUser

  const team_id = formData.get("teamId") as string;
  const startDate = formData.get("startDate") as string;

  console.log("startDate", startDate);

  const { error, data } = await supabase
    .from("seasons")
    .insert({
      name: seasonName,
      team_id: team_id,
      date: startDate,
    })
    .select();

  if (error || !data) {
    console.log("Team creation error: ", error);
    return { message: "Failed to create teeam" + (error?.message || "") };
  }

  revalidatePath("/");
  redirect("/");
}
