import Link from "next/link";
import { signout } from "@/actions/auth/signout";

const sections = [
  { name: "Game", url: "create/game" },
  { name: "Team", url: "create/team" },
  { name: "Seasons", url: "create/season" },
];

export default async function Nav() {
  return (
    <nav className="z-50 px-5 py-3 bg-background sticky top-0 w-full rounded-sm mx-auto">
      <div className="max-w-7xl px-4 py-2 mx-auto flex justify-between items-center">
        <div className="flex justify-between w-full">
          <div className="flex justify-between gap-6">
            {sections.map((section) => (
              <Link key={section.url} href={`/${section.url}`}>
                {section.name}
              </Link>
            ))}
          </div>

          <form action={signout as unknown as any}>
            <button type="submit">Logout</button>
          </form>
        </div>
      </div>
    </nav>
  );
}
