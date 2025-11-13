"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { addGameStats } from "@/actions/games/addGameStats";
import ScoreWidget from "@/components/form/ScoreWidget/ScoreWidget";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const formSchema = z.object({
  appearance: z.boolean(),
  goals: z.number().min(0),
  assists: z.number().min(0),
  gk: z.number().min(0).max(8),
});

export default function PlayerStatsForm({
  player,
  gameId,
}: {
  player: {
    name: string;
    user_id: string;
    appearance: boolean;
    goals: number;
    assists: number;
    gk: number;
  };
  gameId: string;
}) {
  const [complete, setComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    name,
    user_id,
    appearance: appearanceDefault,
    goals: goalsDefault,
    assists: assistsDefault,
    gk: gkDefault,
  } = player;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      appearance: appearanceDefault,
      goals: goalsDefault,
      assists: assistsDefault,
      gk: gkDefault,
    },
  });

  const { watch, setValue, register, handleSubmit } = form;
  const appearance = watch("appearance");

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    const hasAdded = await addGameStats({ ...data, game_id: gameId, user_id });
    if (hasAdded.success) {
      setComplete(true);
    }
    setLoading(false);
  };

  if (complete) {
    return null;
  }

  return (
    <Card className="mb-6 border">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between px-4 py-3 rounded">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-primary" />
            <h2 className="text-lg font-semibold tracking-wide">{name}</h2>
          </div>
          <Switch
            checked={appearance}
            onCheckedChange={(val) => setValue("appearance", val)}
          />
        </div>

        {appearance && !complete && (
          <CardContent className="space-y-4  mt-4">
            <ScoreWidget
              text="Goals"
              name="goals"
              score={watch("goals")}
              setScore={(val) => setValue("goals", val)}
              min={0}
              step={1}
            />

            <ScoreWidget
              text="Assists"
              name="assists"
              score={watch("assists")}
              setScore={(val) => setValue("assists", val)}
              min={0}
              step={1}
            />

            <ScoreWidget
              text="GK"
              name="gk"
              score={watch("gk")}
              setScore={(val) => setValue("gk", val)}
              min={0}
              step={0.25}
              max={1}
            />

            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </CardContent>
        )}
      </form>
    </Card>
  );
}
