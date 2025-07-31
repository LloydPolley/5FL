"use client";

import { X, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useActionState } from "react";
import { createTeam } from "@/actions/teams/createTeam";

type PlayerType = {
  name: string;
  id?: number;
  team_id?: number;
};

const initState = {
  message: "",
};

export default function CreateTeamForm({
  teamId,
  users,
}: {
  teamId: string;
  users: PlayerType[];
}) {
  const [existingPlayers, setExistingPlayers] = useState<PlayerType[]>([]);
  const [newPlayers, setNewPlayers] = useState<string[]>([]);
  const [player, setPlayer] = useState<string>("");

  const [formStateTeam, formActionCreate] = useActionState(
    createTeam,
    initState
  );

  useEffect(() => {
    if (users?.length) setExistingPlayers(users);
  }, [users]);

  const addPlayer = () => {
    const trimmed = player.trim();
    if (!trimmed) return;

    const nameTaken =
      existingPlayers.some((p) => p.name === trimmed) ||
      newPlayers.includes(trimmed);

    if (nameTaken) return;

    setNewPlayers((prev) => [...prev, trimmed]);
    setPlayer("");
  };

  const removePlayer = (name: string) => {
    setNewPlayers((prev) => prev.filter((p) => p !== name));
  };

  return (
    <form className="form" action={formActionCreate}>
      <h1 className="h1">Create team</h1>

      {formStateTeam?.message && (
        <p className="text-red-500 text-center mb-4">{formStateTeam.message}</p>
      )}

      <div className="flex items-center gap-2">
        <input
          className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Add player name"
          type="text"
          value={player}
          onChange={(e) => setPlayer(e.target.value)}
        />
        <button
          type="button"
          onClick={addPlayer}
          disabled={!player.trim()}
          className={`flex items-center gap-1 px-4 py-3 rounded-lg font-semibold ${
            player.trim()
              ? "bg-black text-white hover:bg-gray-800"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
        >
          <Plus size={18} />
          Add
        </button>
      </div>

      <div className="flex flex-col gap-4 mt-6">
        {existingPlayers.map((p, index) => (
          <div
            key={`existing-${p.name}-${index}`}
            className="flex justify-between items-center bg-gray-100 text-gray-900 rounded-xl py-3 px-5"
          >
            <p className="font-medium">{p.name}</p>
          </div>
        ))}

        {newPlayers.map((name, index) => (
          <div
            key={`new-${name}-${index}`}
            className="flex justify-between items-center bg-gray-100 text-gray-900 rounded-xl py-3 px-5 hover:shadow-sm transition"
          >
            <p className="font-medium">{name}</p>
            <button
              type="button"
              onClick={() => removePlayer(name)}
              className="text-gray-500 hover:text-red-500 transition"
            >
              <X />
            </button>
          </div>
        ))}
      </div>

      <input type="hidden" name="teamId" defaultValue={teamId} />
      <input
        type="hidden"
        name="newPlayers"
        value={JSON.stringify(newPlayers)}
      />

      <input className="black-btn" type="submit" value="Submit Team" />
    </form>
  );
}
