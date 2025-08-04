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

type PlayerType = {
  name: string;
  id?: number;
  team_id?: number;
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

  const onSubmit = (data: FormValues) => {
    createTeam({
      teamId,
      players: newPlayers,
    });
  };

  return (
    <Card className="p-8 w-full max-w-lg min-w-[400px] sm:min-w-0 mx-auto space-y-6">
      <CardHeader className="p-0 mb-4">
        <h1 className="text-2xl font-bold text-center">Create Team</h1>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="playerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add player name</FormLabel>
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
                <div
                  key={`existing-${p.name}-${i}`}
                  className="flex justify-between items-center bg-gray-100 text-gray-900 rounded-xl py-3 px-5"
                >
                  <p className="font-medium">{p.name}</p>
                </div>
              ))}

              {newPlayers.map((name, i) => (
                <div
                  key={`new-${name}-${i}`}
                  className="flex justify-between items-center bg-gray-100 text-gray-900 rounded-xl py-3 px-5 hover:shadow-sm transition"
                >
                  <p className="font-medium">{name}</p>
                  <button
                    type="button"
                    onClick={() => removePlayer(name)}
                    className="text-gray-500 hover:text-red-500 transition"
                  >
                    <X />
                  </button>
                </div>
              ))}
            </div>

            <Button type="submit" className="w-full">
              Submit Team
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
