"use client";

import { useEffect, useState, useTransition } from "react";
import { useActionState } from "react";

import { createGame } from "@/actions/games/createGame";
import ScoreWidget from "@components/ScoreWidget/ScoreWidget";

const initState = {
  message: "",
  gameId: "",
};

export default function CreateGameForm({
  teamId,
  result,
  seasons,
}: {
  teamId: string;
  result: any;
  seasons: { id: string; name: string }[];
}) {
  const [opponentName, setOpponentName] = useState(result?.opponent || "");
  const [teamScore, setTeamScore] = useState(result?.team_score || 0);
  const [opponentScore, setOpponentScore] = useState(
    result?.opponent_score || 0
  );
  const [selectedSeason, setSelectedSeason] = useState(
    result?.season_id || seasons?.[0]?.id
  );

  const [formStateCreate, formActionCreate] = useActionState(
    createGame,
    initState
  );

  console.log("result", result);

  return (
    <form className="form" action={formActionCreate}>
      <h1 className="text-gray-800 font-bold text-4xl mb-6">Add Game</h1>

      {formStateCreate?.message && (
        <p className="text-red-500 text-center">{formStateCreate.message}</p>
      )}

      <select
        name="season_id"
        value={selectedSeason}
        onChange={(e) => setSelectedSeason(e.target.value)}
        className="input-text"
        required
      >
        <option value="" disabled>
          Select Season
        </option>
        {seasons?.map((season) => (
          <option key={season.id} value={season.id}>
            {season.name}
          </option>
        ))}
      </select>

      <input
        className="input-text"
        placeholder="Opponent Name"
        type="text"
        name="opponentName"
        value={opponentName}
        onChange={(e) => setOpponentName(e.target.value)}
        required
      />

      <input hidden type="text" name="game_id" defaultValue={result?.id} />
      <input hidden type="text" name="team_id" defaultValue={teamId} />
      <input
        hidden
        type="text"
        name="season_id"
        defaultValue={selectedSeason}
      />

      <ScoreWidget
        text="Fulham Ballers"
        name="team_score"
        score={teamScore}
        setScore={setTeamScore}
      />
      <ScoreWidget
        text={opponentName || "Opponent"}
        name="opponent_score"
        score={opponentScore}
        setScore={setOpponentScore}
      />

      <input type="submit" value="AddGame" />
    </form>
  );
}
