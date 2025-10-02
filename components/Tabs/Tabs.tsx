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
      value={activeSection}
      onValueChange={(val) => router.push(`/create/${val}`)}
      className="mb-5 w-fit mx-auto"
    >
      <TabsList className="grid w-fit grid-cols-3 border-1 border-gray-200 bg-gray-50">
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
