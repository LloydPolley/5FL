import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TableHeader({
  season,
  team,
  team_id,
  activeSeason,
}: {
  season: string;
  team: string;
  team_id?: string;
  activeSeason?: any;
}) {
  return (
    <div
      className="mx-auto p-6 lg:p-16 text-center flex flex-col justify-center"
      data-testid="hero"
    >
      <p className="text-base sm:text-lg mx-auto mb-0">{season}</p>
      <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mt-0">
        {team}
      </h1>
      {team_id && activeSeason && (
        <Button className="mt-6 w-fit mx-auto" asChild variant="default">
          <Link href={`/team/${team_id}/games?season_id=${activeSeason?.id}`}>
            See All Games
          </Link>
        </Button>
      )}
    </div>
  );
}
