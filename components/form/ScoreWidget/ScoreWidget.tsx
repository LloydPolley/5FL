"use client";

import { Minus, Plus } from "lucide-react";

export default function ScoreWidget({
  text,
  score,
  name,
  setScore,
  min = 0,
  max = 100,
  step = 1,
}: {
  text: string;
  score: number;
  name: string;
  setScore: (score: number) => void;
  min?: number;
  max?: number;
  step?: number;
}) {
  const increment = () => setScore(Math.min(score + step, max));
  const decrement = () => setScore(Math.max(score - step, min));

  return (
    <div className="flex items-center justify-between rounded-md p-4 bg-white/5">
      <p className="text-md font-medium">{text}</p>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={decrement}
          className="flex items-center justify-center w-10 h-10 rounded-md border bg-white/10 hover:bg-white/20 transition"
        >
          <Minus className="w-5 h-5" />
        </button>

        <div className="min-w-[2.5rem] text-center text-2xl font-bold tabular-nums">
          {score}
        </div>

        <button
          type="button"
          onClick={increment}
          className="flex items-center justify-center w-10 h-10 rounded-md border bg-white/10 hover:bg-white/20 transition"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
