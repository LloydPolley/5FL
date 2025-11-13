"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: { email: string; password: string }) {
  const supabase = await createClient();

  const { email, password } = formData;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.log("error", error);
    throw error;
  } else {
    redirect("/");
  }
}
