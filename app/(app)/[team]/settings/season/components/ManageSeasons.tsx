"use client";

import { useState } from "react";
import { useActionState } from "react";

import { createSeason } from "../../actions/seasons";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const initState = {
  message: "",
};

export default function ManageSeasons({ teamId }: { teamId: string }) {
  const [seasonName, setSeasonName] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const [formStateTeam, formActionCreate] = useActionState(
    createSeason,
    initState
  );

  return (
    <form className="m-auto flex flex-col" action={formActionCreate}>
      <h1 className="text-gray-800 font-bold text-4xl my-10">Add season</h1>
      {formStateTeam?.message && (
        <p className="text-red-500 text-center">{formStateTeam.message}</p>
      )}
      <input
        className="input-text"
        placeholder="Season Name"
        type="text"
        name="seasonName"
        value={seasonName}
        onChange={(e) => setSeasonName(e.target.value)}
      />

      <DatePicker
        className="input-text w-full"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        dateFormat="dd/MM/yyyy"
      />

      <input
        hidden
        type="text"
        name="startDate"
        defaultValue={startDate?.toISOString() || ""}
      />
      <input hidden type="text" name="teamId" defaultValue={teamId} />
      <button className="main-btn" type="submit">
        Add season
      </button>
    </form>
  );
}
