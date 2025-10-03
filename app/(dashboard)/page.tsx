import { createClient } from "@/utils/supabase/server";
import Hero from "@/components/Landing/Hero/Hero";
import TeamCards from "@/components/Landing/TeamCards/TeamCards";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: teams } = await supabase.from("teams").select();

  console.log("user", user);

  return (
    <>
      <section className="px-6">
        <TeamCards teams={teams} user={user} />
      </section>

      <section className="px-6 py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>{" "}
          <p className="text-xl text-gray-300 mb-8">
            Create your team and start tracking performance today
          </p>
          <Button size="lg" className="text-lg px-8 py-4 h-auto">
            <Link href="/create/team">Create Your Team</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
