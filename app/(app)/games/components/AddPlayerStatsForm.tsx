"use client";

import { useState } from "react";
import { useActionState } from "react";
import ReactSwitch from "react-switch";

import { addStatsToGame } from "../actions";
import ScoreWidget from "./ScoreWidget";

const initState = {
  message: "",
  success: false,
};

export default function AddPlayerStatsForm({
  user,
  gameId,
}: {
  user: { name: string; id: number };
  gameId: string;
}) {
  const { name, id } = user;

  const [appearance, setAppearance] = useState(false);
  const [goals, setGoals] = useState<number>(0);
  const [assists, setAssists] = useState<number>(0);
  const [gk, setGK] = useState<number>(0);

  const [, formAction] = useActionState(addStatsToGame, initState);

  return (
    <form
      action={formAction}
      className={`border rounded-xl p-8 flex flex-col gap-4 bg-slate-100 overflow-hidden ${
        !appearance ? "h-[100px]" : "h-auto"
      }`}
    >
      <input type="hidden" name="user_id" value={id} />

      <input name="game_id" defaultValue={gameId} hidden />
      <input name="user_id" defaultValue={id} hidden />
      <input
        type="hidden"
        name="appearance"
        value={appearance ? "true" : "false"}
      />

      <div className="flex justify-between mb-6">
        <p className="font-medium text-3xl">{name}</p>
        <ReactSwitch
          checked={appearance}
          onChange={() => setAppearance(!appearance)}
        />
      </div>

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
        step={0.25}
        max={1}
      />

      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded-md font-bold"
      >
        Save
      </button>
    </form>
  );
}
