"use client";

import { createOrEditGame } from "@/actions/games/createGame";
import ScoreWidget from "@/components/form/ScoreWidget/ScoreWidget";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import z from "zod";
import { Card } from "@/components/ui/card";
import FormHeader from "../FormHeader/FormHeader";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

const loginSchema = z.object({
  season: z.string().min(1),
  opponentName: z.string().min(1),
  teamScore: z.number(),
  opponentScore: z.number(),
  date: z.date().nullable(),
});

export default function CreateGameForm({
  teamId,
  result,
  seasons,
}: {
  teamId: string;
  result: any;
  seasons: { id: string; name: string }[];
}) {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      season: result?.season_id?.toString()
        ? result?.season_id?.toString()
        : seasons[seasons.length - 1].id.toString(),
      opponentName: result?.opponent || "",
      teamScore: result?.team_score || 0,
      opponentScore: result?.opponent_score || 0,
      date: result?.date ? new Date(result.date) : new Date(),
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    const { season, opponentName, teamScore, opponentScore, date } = data;
    try {
      setLoading(true);
      await createOrEditGame({
        season_id: season,
        opponent_name: opponentName,
        team_score: teamScore,
        opponent_score: opponentScore,
        team_id: teamId,
        gameId: result?.id,
        date: date ? format(date, "yyyy-MM-dd") : "",
      });
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <FormHeader
        title={result?.id ? "Edit Game" : "Add Game"}
        description={
          result?.id ? "Edit existing game details" : "Create a new game result"
        }
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card className="space-y-4 my-4 p-6">
            <FormField
              control={form.control}
              name="season"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Season</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a season" />
                      </SelectTrigger>
                      <SelectContent>
                        {seasons.map((season) => (
                          <SelectItem
                            key={season.id}
                            value={season.id.toString()}
                          >
                            {season.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="input"
                        className={cn("w-full justify-start text-left")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value
                          ? format(field.value, "dd/MM/yyyy")
                          : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value ?? undefined}
                        onSelect={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="opponentName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Opponent Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter opponent name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card>

          <Card className="space-y-4 my-4 p-6">
            <div className="">
              <h2 className="text-xl font-bold">Final Score</h2>
              <p>Enter the match result</p>
            </div>
            <FormField
              control={form.control}
              name="teamScore"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ScoreWidget
                      text="Fulham Ballers"
                      name={field.name}
                      score={Number(field.value) || 0}
                      setScore={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="opponentScore"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ScoreWidget
                      text={form.getValues("opponentName") || "Opponent"}
                      name={field.name}
                      score={Number(field.value) || 0}
                      setScore={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-4">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Spinner /> : "Add Game"}
              </Button>
            </div>
          </Card>
        </form>
      </Form>

      <div className="mt-6">
        <Button className="w-full" asChild variant="ghost">
          <Link href="/edit">Edit Game</Link>
        </Button>
      </div>
    </div>
  );
}
