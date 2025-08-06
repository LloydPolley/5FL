import Link from "next/link";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
  CarouselItem,
} from "../ui/carousel";
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card";

export default function Hero1({ teams }: { teams: any }) {
  return (
    <>
      <div
        className="mx-auto p-6 pb-16 pt-32 text-center space-y-6 flex flex-col justify-center rounded-2xl bg-muted"
        data-testid="hero"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
          Browse Active Teams
        </h1>
        <p className="text-base sm:text-lg max-w-xl mx-auto w-[calc(100%-4rem)]">
          Pick a team to view its matches, stats, and performance.
        </p>

        <div className="flex gap-4 justify-center w-[300px] mx-auto">
          <Button className="basis-1/2" asChild variant="default">
            <Link href="/create/game">Add game</Link>
          </Button>
          <Button className="basis-1/2" asChild variant="outline">
            <Link href="/create/season">Add season</Link>
          </Button>
        </div>
      </div>

      <Carousel className="w-[80%] mx-auto pb-20">
        <CarouselContent>
          {teams?.map((team: any) => (
            <CarouselItem key={team.id} className="md:basis-1/3">
              <Link href={`/team/${team.id}`}>
                <Card className="w-[95%] px-4 py-6 mx-auto min-h-[350px] flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                  <CardContent>
                    <CardTitle className="text-5xl">{team.name}</CardTitle>
                  </CardContent>
                  <CardFooter className="text-right pb-0">
                    <Button className="ml-auto" variant="default">
                      View Team
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
    </>
  );
}
