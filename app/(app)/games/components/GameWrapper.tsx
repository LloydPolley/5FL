"use client";

import { useState } from "react";

import AddPlayerStatsForm from "./AddPlayerStatsForm";
import CreateGameForm from "./CreateGameForm";

type TeamMemberType = {
  name: string;
  id: number;
};

export default function GameWrapper({
  user,
  teamMembers,
}: {
  user: { UID: string; team_id: string };
  teamMembers: TeamMemberType[];
}) {
  const [gameId, setGameId] = useState<string>("");
  return (
    <div className="p-4 flex flex-col gap-4">
      <CreateGameForm user={user} setGameId={setGameId} />
      {teamMembers.map((member) => {
        const { name } = member;
        return <AddPlayerStatsForm key={name} user={member} gameId={gameId} />;
      })}
      <button>Finish</button>
    </div>
  );
}
