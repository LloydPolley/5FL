"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function createSeason({
  seasonName,
  startDate,
}: {
  seasonName: string;
  startDate: string;
}): Promise<{ message: string }> {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

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
    console.log("Season creation error: ", error);
    return { message: "Failed to create season" + (error?.message || "") };
  }

  revalidatePath("/");
  redirect("/create/game");
}
