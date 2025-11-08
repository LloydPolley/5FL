"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";

const sections = [
  { name: "Game", url: "game" },
  { name: "Team", url: "team" },
  { name: "Seasons", url: "season" },
];

export default function SectionTabs({
  activeSection,
}: {
  activeSection: string;
}) {
  const router = useRouter();

  return (
    <Tabs
      defaultValue={"game"}
      value={activeSection}
      onValueChange={(val) => router.push(`/create/${val}`)}
      className="w-fit mx-auto mt-4"
    >
      <TabsList className="">
        {sections.map((section) => (
          <TabsTrigger
            className="rounded-xl text-base"
            key={section.url}
            value={section.url}
          >
            {section.name}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
