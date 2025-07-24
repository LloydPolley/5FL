"use client";

import { useEffect, useState } from "react";
import { useActionState } from "react";

import { createGame } from "../actions";
import ScoreWidget from "./ScoreWidget";

const initState = {
  message: "",
  gameId: "",
};

export default function CreateGameForm({
  teamId,
  setGameId,
  seasonId,
}: {
  teamId: string;
  setGameId: (id: string) => void;
  seasonId: string;
}) {
  const [opponentName, setOpponentName] = useState<string>("");
  const [teamScore, setTeamScore] = useState<number>(0);
  const [opponentScore, setOpponentScore] = useState<number>(0);

  const [formStateCreate, formActionCreate] = useActionState(
    createGame,
    initState
  );

  useEffect(() => {
    if (formStateCreate?.gameId) setGameId(formStateCreate?.gameId);
  }, [formStateCreate.gameId, setGameId]);

  console.log("formStateCreate", formStateCreate);

  return (
    <form
      className="border rounded-xl p-8 flex flex-col gap-4 bg-slate-100 overflow-hidden"
      action={formActionCreate}
    >
      <h1 className="text-gray-800 font-bold text-4xl mb-6">Add Game</h1>

      {formStateCreate?.message && (
        <p className="text-red-500 text-center">{formStateCreate.message}</p>
      )}

      <input
        className="input-text"
        placeholder="Opponent Name"
        type="text"
        name="opponentName"
        value={opponentName}
        onChange={(e) => setOpponentName(e.target.value)}
        required
      />

      <input hidden type="text" name="team_id" defaultValue={teamId} />
      <input hidden type="text" name="season_id" defaultValue={seasonId} />

      <ScoreWidget
        text="Fulham Ballers"
        name={"team_score"}
        score={teamScore}
        setScore={setTeamScore}
      />
      <ScoreWidget
        text={opponentName || "Opponent"}
        name={"opponent_score"}
        score={opponentScore}
        setScore={setOpponentScore}
      />

      <button
        className="bg-black text-white px-4 py-2 rounded-md font-bold"
        type="submit"
      >
        Add Game
      </button>
    </form>
  );
}
