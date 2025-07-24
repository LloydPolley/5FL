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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value)) setScore(value);
  };

  const increment = () => {
    const newScore = Math.min(score + step, max);
    setScore(parseFloat(newScore.toFixed(10)));
  };

  const decrement = () => {
    const newScore = Math.max(score - step, min);
    setScore(parseFloat(newScore.toFixed(10)));
  };

  return (
    <div className="flex justify-between items-center">
      <p className="w-24 text-md">{text}</p>

      <div className="border rounded-md flex p-4 font-bold bg-white">
        <button type="button" onClick={decrement} className="">
          <Minus className="w-4 h-4" />
        </button>

        <input
          className="w-20 text-center"
          type="number"
          name={name}
          value={score}
          min={min}
          max={max}
          step={step}
          onChange={handleChange}
        />

        <button type="button" onClick={increment} className="">
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
