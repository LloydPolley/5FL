import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TeamCards({ teams, user }: { teams: any; user: any }) {
  return (
    <div>
      <div
        className="mx-auto p-6 pt-24 pb-32 text-center space-y-6 flex flex-col justify-center"
        data-testid="hero"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
          5 Fantasy League
        </h1>
        <p className="text-base sm:text-lg max-w-xl mx-auto w-[calc(100%-4rem)]">
          Pick a team to view its matches, stats, and performance.
        </p>

        {user && (
          <div className="flex gap-4 justify-center w-[300px] mx-auto">
            <Button className="basis-1/2" asChild variant="default">
              <Link href="/create/game">Add game</Link>
            </Button>
            <Button className="basis-1/2" asChild variant="outline">
              <Link href="/create/season">Add season</Link>
            </Button>
          </div>
        )}
        {!user && (
          <div className="flex gap-4 justify-center w-[300px] mx-auto">
            <Button className="basis-1/2" asChild variant="default">
              <Link href="/login">Login</Link>
            </Button>
            <Button className="basis-1/2" asChild variant="outline">
              <Link href="/signup">Register</Link>
            </Button>
          </div>
        )}
      </div>
      <h2 className="mb-4 ml-2 text-2xl font-bold">Active Teams</h2>
      <Carousel className="max-w-full overflow-hidden mb-10">
        <CarouselContent className="">
          {teams?.map((team: any) => (
            <CarouselItem key={team.id} className="md:basis-1/3">
              <Link href={`/team/${team.id}`}>
                <Card className="p-4 mx-auto min-h-[450px] border flex flex-col justify-between glass-card">
                  <CardHeader className="border rounded">
                    <CardTitle className="text-3xl text-center">
                      {team.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent></CardContent>
                  <CardFooter className="p-0">
                    <Button className="w-full" variant="default" size="lg">
                      VIEW TEAM
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
