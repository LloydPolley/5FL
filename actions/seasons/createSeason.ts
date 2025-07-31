"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function createSeason(
  currentState: { message: string },
  formData: FormData
): Promise<{ message: string }> {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  const seasonName = formData.get("seasonName") as string;
  const startDate = formData.get("startDate") as string;

  const { data: userData } = await supabase
    .from("users")
    .select("*")
    .eq("UID", data.user?.id)
    .single();

  console.log("userData", userData);

  const { team_id } = userData;

  const { error } = await supabase
    .from("seasons")
    .insert({
      name: seasonName,
      team_id,
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
