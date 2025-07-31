import Link from "next/link";

const sections = [
  { name: "Game", url: "game" },
  { name: "Team", url: "team" },
  { name: "Seasons", url: "season" },
];

export default function RadioButtons({
  activeSection,
}: {
  activeSection: string;
}) {
  return (
    <div className="flex gap-2">
      {sections.map((section) => {
        const isActive = section.url === activeSection;
        return (
          <Link
            key={section.url}
            href={`/create/${section.url}`}
            className={`px-6 py-2 rounded-2xl font-bold border-2 border-gray-100 transition-colors duration-200 mb-5
              ${
                isActive
                  ? "bg-black text-white border-black"
                  : "bg-transparent text-black bg-white border-gray-100"
              }`}
            aria-pressed={isActive}
          >
            {section.name}
          </Link>
        );
      })}
    </div>
  );
}
