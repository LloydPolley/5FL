"use client";

import { useState } from "react";

import AddPlayerStatsForm from "./AddPlayerStatsForm";
import CreateGameForm from "./CreateGameForm";

type TeamMemberType = {
  name: string;
  id: number;
};

export default function GameWrapper({
  teamId,
  teamMembers,
  seasonId,
}: {
  teamId: string;
  teamMembers: TeamMemberType[];
  seasonId: string;
}) {
  const [gameId, setGameId] = useState<string>("");
  return (
    <div className="flex flex-col gap-4">
      <CreateGameForm
        teamId={teamId}
        seasonId={seasonId}
        setGameId={setGameId}
      />
      {teamMembers.map((member) => {
        const { name } = member;
        return (
          <AddPlayerStatsForm key={name} player={member} gameId={gameId} />
        );
      })}
      <button>Finish</button>
    </div>
  );
}
