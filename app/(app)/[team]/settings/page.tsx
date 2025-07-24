import Link from "next/link";

const sections = [
  { name: "Team", url: "team" },
  { name: "Seasons", url: "season" },
];

export default async function Settings({
  params,
}: {
  params: { team: string };
}) {
  return (
    <div>
      {sections.map((section) => (
        <Link
          key={section.url}
          className="main-btn"
          href={`/${params.team}/settings/${section.url}`}
        >
          {section.name}
        </Link>
      ))}
    </div>
  );
}
