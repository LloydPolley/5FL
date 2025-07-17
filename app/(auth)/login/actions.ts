"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(
  currentState: { message: string },
  formData: FormData
) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  console.log("email", formData.get("email"));

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.log("error", error);
    return error;
  } else {
    revalidatePath("/", "layout");
    redirect("/");
  }
}
