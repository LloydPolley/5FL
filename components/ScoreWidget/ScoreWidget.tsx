"use client";

import { Minus, Plus } from "lucide-react";
import { Input } from "../ui/input";

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

      <div className="border rounded-md flex p-4 font-bold w-[50%]">
        <button type="button" onClick={decrement} className="w-1/2 text-center">
          <Minus className="w-4 h-4 m-auto" />
        </button>

        <Input
          className="text-center border-none p-0"
          type="number"
          name={name}
          value={score}
          min={min}
          max={max}
          step={step}
          onChange={handleChange}
          disabled
        />

        <button type="button" onClick={increment} className="w-1/2 text-center">
          <Plus className="w-4 h-4 m-auto" />
        </button>
      </div>
    </div>
  );
}
