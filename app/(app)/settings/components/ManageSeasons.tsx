"use client";

import { useState } from "react";
import { useActionState } from "react";

import { createSeason } from "../actions/seasons";

const initState = {
  message: "",
};

export default function ManageSeasons({
  user,
}: {
  user: { UID: string; team_id: string };
}) {
  const [seasonName, setSeasonName] = useState<string>("");

  const [formStateTeam, formActionCreate] = useActionState(
    createSeason,
    initState
  );

  return (
    <form className="m-auto flex flex-col w-[80%]" action={formActionCreate}>
      <h1 className="text-gray-800 font-bold text-4xl my-10">Add season</h1>

      {formStateTeam?.message && (
        <p className="text-red-500 text-center">{formStateTeam.message}</p>
      )}

      <input
        className="input-text"
        placeholder="Player name"
        type="text"
        name="seasonName"
        value={seasonName}
        onChange={(e) => setSeasonName(e.target.value)}
      />

      <input hidden type="text" name="teamId" defaultValue={user.team_id} />

      <button
        className="bg-blue-700 rounded-xl mt-5 p-4 font-bold text-white"
        type="submit"
      >
        Add season
      </button>
    </form>
  );
}
