import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import Hero from "@/components/Hero/Hero";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: teams } = await supabase.from("teams").select();

  console.log("user", user);

  return (
    <div className="wrapper">
      <Hero user={user} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 justify-start">
        {teams?.map((team) => (
          <Link key={team.id} href={`/team/${team.id}`}>
            <Card className="w-[80%] md:w-auto mx-auto min-h-96 flex flex-col justify-between bg-card">
              <CardHeader>
                <CardDescription>Team</CardDescription>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-center">{team.name}</CardTitle>
              </CardContent>
              <CardFooter className="text-right">
                <Button className="ml-auto" variant="default">
                  View Team
                </Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
