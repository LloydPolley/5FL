import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden px-8 py-20 lg:py-32 bg-white rounded-2xl"
      data-testid="hero"
    >
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full blur-3xl opacity-50 -z-10" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
        <div className="space-y-6 text-center lg:text-left">
          <span className="inline-block text-sm font-medium bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
            New for 2025
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Track Every Game. <br />
            Every Player.
          </h1>
          <p className="text-base sm:text-lg max-w-md mx-auto lg:mx-0 text-zinc-600">
            Stay on top of your team’s progress, performance, and stats - all in
            one place.
          </p>
          <div className="flex gap-4 justify-center lg:justify-start">
            <Button
              className="px-6 py-3 text-base font-semibold transition-transform hover:scale-105"
              asChild
              variant="default"
            >
              <Link href="/signup">Create Team</Link>
            </Button>
            <Button
              className="px-6 py-3 text-base font-semibold transition-transform hover:scale-105"
              asChild
              variant="outline"
            >
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="relative aspect-video w-full max-w-xl mx-auto">
            <Image
              src="/hero.png" // Replace with your image path
              alt="Team Dashboard Preview"
              fill
              objectFit="cover"
              className="object-contain rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
