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

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError || !authData.user) {
    console.log("SIGN UP ERROR", authError);
    return { message: "Signup failed: " + authError?.message };
  }

  console.log("authData", authData);

  const { error } = await supabase.from("users").insert({
    UID: authData.user.id,
    name,
  });

  if (error) {
    console.log("Player insert error", error);
    return { message: "Insert failed: " + error.message };
  }

  redirect("/");
}
