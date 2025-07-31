"use client";

import { useState } from "react";
import { useActionState } from "react";

import { createSeason } from "@/actions/seasons/createSeason";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const initState = {
  message: "",
};

export default function CreateSeasonForm() {
  const [seasonName, setSeasonName] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const [formStateTeam, formActionCreate] = useActionState(
    createSeason,
    initState
  );

  return (
    <form className="form" action={formActionCreate}>
      <h1 className="h1">Add season</h1>
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
      <input type="submit" value="Add season" />
    </form>
  );
}
