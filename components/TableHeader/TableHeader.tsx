export default function TableHeader({
  season,
  team,
}: {
  season: string;
  team: string;
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
    </div>
  );
}
