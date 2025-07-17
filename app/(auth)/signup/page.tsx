import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import SignUpForm from "./components/SignUpForm";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/");
  }

  return (
    <div className="text-center h-dvh flex flex-col py-14 lg:py-40">
      <SignUpForm />
    </div>
  );
}
