"use client";

import { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { createTeam } from "@/actions/teams/createTeam";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FormHeader from "../FormHeader/FormHeader";
import PlayerForm from "./PlayerForm";

type PlayerType = {
  name: string;
  id?: number;
  team_id?: number;
  isDisabled?: boolean;
};

const schema = z.object({
  playerName: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function CreateTeamForm({
  teamId,
  users,
}: {
  teamId: string;
  users: PlayerType[];
}) {
  const [existingPlayers, setExistingPlayers] = useState<PlayerType[]>([]);
  const [newPlayers, setNewPlayers] = useState<string[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      playerName: "",
    },
  });

  useEffect(() => {
    if (users?.length) setExistingPlayers(users);
  }, [users]);

  const addPlayer = () => {
    const trimmed = form.getValues("playerName")?.trim();
    if (!trimmed) return;

    const nameTaken =
      existingPlayers.some((p) => p.name === trimmed) ||
      newPlayers.includes(trimmed);

    if (nameTaken) return;

    setNewPlayers((prev) => [...prev, trimmed]);
    form.setValue("playerName", "");
  };

  const removePlayer = (name: string) => {
    setNewPlayers((prev) => prev.filter((p) => p !== name));
  };

  const disablePlayer = (name: string) => {
    // setNewPlayers((prev) => prev.filter((p) => p !== name));
  };

  const onSubmit = (data: FormValues) => {
    createTeam({
      teamId,
      players: newPlayers,
    });
  };

  console.log("existingPlayers", existingPlayers);

  return (
    <div>
      <FormHeader title="Add Team" description="Add and disable players" />
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="playerName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter player name"
                        {...field}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        onClick={addPlayer}
                        disabled={!field.value?.trim()}
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-3">
              {existingPlayers.map((p, i) => (
                <PlayerForm
                  key={`existing-${p.name}-${i}`}
                  name={p.name}
                  isDisabled={p.isDisabled}
                  togglePlayer={disablePlayer}
                />
              ))}

              {newPlayers.map((name, i) => (
                <PlayerForm
                  key={`new-${name}-${i}`}
                  name={name}
                  removePlayer={removePlayer}
                />
              ))}
            </div>

            <Button type="submit" className="w-full">
              Submit Team
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}
