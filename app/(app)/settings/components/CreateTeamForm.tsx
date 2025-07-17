"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { useActionState } from "react";

import { createTeam } from "../actions/teams";

type PlayerType = string;

const initState = {
  message: "",
};

export default function CreateTeamForm() {
  const [teamName, setTeamName] = useState<string>("");
  const [players, setPlayers] = useState<PlayerType[]>([]);
  const [player, setPlayer] = useState<string>("");

  const [formStateTeam, formActionCreate] = useActionState(
    createTeam,
    initState
  );

  const removePlayer = (removeP: string) => {
    setPlayers(players.filter((p) => removeP !== p));
  };

  return (
    <form className="m-auto flex flex-col w-[80%]" action={formActionCreate}>
      <h1 className="text-gray-800 font-bold text-4xl my-10">Create team</h1>

      {formStateTeam?.message && (
        <p className="text-red-500 text-center">{formStateTeam.message}</p>
      )}

      <input
        className="input-text"
        placeholder="Team name"
        type="text"
        name="teamName"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        required
      />

      <input
        className="input-text"
        placeholder="Player name"
        type="text"
        value={player}
        onChange={(e) => setPlayer(e.target.value)}
      />

      <button
        className="bg-black text-white rounded-xl mt-5 p-4 font-bold"
        onClick={(e) => {
          e.preventDefault();
          if (!player.trim()) return;
          setPlayers((prev: PlayerType[]) => [...prev, player.trim()]);
          setPlayer("");
        }}
      >
        Add
      </button>

      <button
        className="bg-black text-white rounded-xl mt-5 p-4 font-bold"
        type="submit"
      >
        Submit Team
      </button>

      <div className="flex flex-col gap-5 mt-10">
        {players.map((player, index) => (
          <div
            key={`${player}-${index}`}
            className="flex justify-between bg-gray-100 text-gray-900 rounded-xl py-4 px-6"
          >
            <input key={index} type="hidden" name="players[]" value={player} />
            <p className="font-bold">{player}</p>
            <button
              onClick={(e) => {
                e.preventDefault();
                removePlayer(player);
              }}
            >
              <X />
            </button>
          </div>
        ))}
      </div>
    </form>
  );
}
