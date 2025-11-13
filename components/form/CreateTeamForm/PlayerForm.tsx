"use client";

import { X, ShieldBan, ShieldCheck } from "lucide-react";

export default function PlayerForm({
  name,
  isDisabled,
  removePlayer,
  togglePlayer,
}: {
  name: string;
  isDisabled?: boolean;
  removePlayer?: (name: string) => void;
  togglePlayer?: (name: string) => void;
}) {
  return (
    <div className="space-y-3 border-b">
      <div className="flex justify-between items-center rounded py-3 px-5 hover:shadow-sm transition">
        <p className="font-medium">{name}</p>
        {removePlayer && (
          <button
            type="button"
            onClick={() => removePlayer(name)}
            className="text-gray-500 hover:text-red-500 transition"
          >
            <X />
          </button>
        )}
        {/* {togglePlayer && (
          <button
            type="button"
            onClick={() => togglePlayer(name)}
            className="text-gray-500 hover:text-red-500 transition"
          >
            {isDisabled ? <ShieldBan /> : <ShieldCheck />}
          </button>
        )} */}
      </div>
    </div>
  );
}
