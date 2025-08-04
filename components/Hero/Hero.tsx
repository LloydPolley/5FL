import Link from "next/link";
import { Button } from "../ui/button";

const contentByUser = {
  loggedOut: {
    heading: "Track Every Game, Every Player.",
    paragraph:
      "Stay on top of your team’s progress, performance and stats all in one place.",
    primaryButton: { href: "/signup", text: "Create Team" },
    secondaryButton: { href: "/login", text: "Login" },
  },
  loggedIn: {
    heading: "Browse Active Teams",
    paragraph: "Pick a team to view its matches, stats, and performance.",
    primaryButton: { href: "/create/game", text: "Add game" },
    secondaryButton: { href: "/create/season", text: "Add season" },
  },
};

export default function Hero({ user }: { user: any }) {
  const isLoggedIn = !!user;
  const content = isLoggedIn ? contentByUser.loggedIn : contentByUser.loggedOut;

  return (
    <div
      className="mx-auto p-6 lg:p-16 min-h-80 text-center space-y-6 flex flex-col justify-center"
      data-testid="hero"
    >
      <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
        {content.heading}
      </h1>
      <p className="text-base sm:text-lg max-w-xl mx-auto w-[calc(100%-4rem)]">
        {content.paragraph}
      </p>
      <div className="flex gap-4 justify-center">
        <Button asChild variant="default">
          <Link href={content.primaryButton.href}>
            {content.primaryButton.text}
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href={content.secondaryButton.href}>
            {content.secondaryButton.text}
          </Link>
        </Button>
      </div>
    </div>
  );
}
