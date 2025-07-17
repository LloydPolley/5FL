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
  user,
  setGameId,
}: {
  user: { UID: string; team_id: string };
  setGameId: (id: string) => void;
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
    <form className="m-auto flex flex-col" action={formActionCreate}>
      <h1 className="text-gray-800 font-bold text-4xl my-10">Add Game</h1>

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

      <input hidden type="text" name="team_id" defaultValue={user.team_id} />

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
        className="bg-blue-700 rounded-xl mt-5 p-4 font-bold text-white"
        type="submit"
      >
        Add Game
      </button>
    </form>
  );
}
