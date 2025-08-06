import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import Hero from "@/components/Hero/Hero";
import Hero1 from "@/components/Hero/Hero1";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
  CarouselItem,
} from "@/components/ui/carousel";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: teams } = await supabase.from("teams").select();

  console.log("user", user);

  return (
    <div className="">
      <Hero />
      <Hero1 teams={teams} />
    </div>
  );
}
