"use client";

import { useEffect, useState } from "react";
import { useActionState } from "react";
import ReactSwitch from "react-switch";

import { addGameStats } from "@/actions/games/addGameStats";
import ScoreWidget from "@components/ScoreWidget/ScoreWidget";

const initState = {
  message: "",
  success: false,
};

export default function PlayerStatsForm({
  player,
  gameId,
}: {
  player: {
    name: string;
    user_id: string;
    appearance: boolean;
    goals: number;
    assists: number;
    gk: number;
  };
  gameId: string;
}) {
  const {
    name,
    user_id,
    appearance: appearanceDefault,
    goals: goalsDefault,
    assists: assistsDefault,
    gk: gkDefault,
  } = player;

  const [appearance, setAppearance] = useState(appearanceDefault || false);
  const [goals, setGoals] = useState<number>(goalsDefault || 0);
  const [assists, setAssists] = useState<number>(assistsDefault || 0);
  const [gk, setGK] = useState<number>(gkDefault || 0);

  const [formState, formAction] = useActionState(addGameStats, initState);

  if (formState?.success) {
    return <p>Added {name}</p>;
  }

  return (
    <form
      action={formAction}
      className={`form ${appearance ? "h-auto" : "h-[100px]"}`}
    >
      <input name="game_id" defaultValue={gameId} hidden />
      <input name="user_id" defaultValue={user_id} hidden />
      <input
        type="hidden"
        name="appearance"
        value={appearance ? "true" : "false"}
      />

      <div className="flex justify-between mb-6">
        <p className="font-medium text-3xl">
          {name} - {user_id}
        </p>
        <ReactSwitch
          checked={appearance}
          onChange={() => setAppearance(!appearance)}
        />
      </div>

      {appearance && (
        <>
          {formState?.success && <p>Added</p>}

          <ScoreWidget
            text="Goals"
            name="goals"
            score={goals}
            setScore={setGoals}
            min={0}
            step={1}
          />

          <ScoreWidget
            text="Assists"
            name="assists"
            score={assists}
            setScore={setAssists}
            min={0}
            step={1}
          />

          <ScoreWidget
            text="GK"
            name="gk"
            score={gk}
            setScore={setGK}
            min={0}
            step={1}
            max={8}
          />

          <input type="submit" value="Save" />
        </>
      )}
    </form>
  );
}
