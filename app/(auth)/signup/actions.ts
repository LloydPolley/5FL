"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function signup(
  currentState: { message: string },
  formData: FormData
): Promise<{ message: string }> {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;
  const teamName = formData.get("teamName") as string;

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError || !authData.user) {
    return { message: "Signup failed: " + authError?.message };
  }

  const { error: userInsertError } = await supabase.from("users").insert({
    UID: authData.user.id,
    name,
  });

  if (userInsertError) {
    return { message: "User insert failed: " + userInsertError.message };
  }

  const { error: teamError, data: teamData } = await supabase
    .from("teams")
    .insert({
      name: teamName,
      manager: authData.user.id,
    })
    .select()
    .single();

  if (teamError) {
    return { message: "Team insert failed: " + teamError.message };
  }

  // optionally update user with team_id now
  await supabase
    .from("users")
    .update({ team_id: teamData.id })
    .eq("UID", authData.user.id);

  redirect("/");
}
