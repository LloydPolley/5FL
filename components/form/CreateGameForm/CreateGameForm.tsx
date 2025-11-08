"use client";

import { createGame } from "@/actions/games/createGame";
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
import { CalendarIcon, Trophy } from "lucide-react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import z from "zod";

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
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      season: result?.season_id?.toString() || "",
      opponentName: result?.opponent || "",
      teamScore: result?.team_score || 0,
      opponentScore: result?.opponent_score || 0,
      date: result?.date ? new Date(result.date) : null,
    },
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    const { season, opponentName, teamScore, opponentScore, date } = data;

    console.log("date", date);

    createGame({
      season_id: season,
      opponent_name: opponentName,
      team_score: teamScore,
      opponent_score: opponentScore,
      team_id: teamId,
      gameId: result?.id,
      date: date ? format(date, "yyyy-MM-dd") : "",
    });
  };

  return (
    <div className="w-full">
      {/* Mobile Header */}
      <div className="lg:hidden mb-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-semibold ml-3">Fulham Ballers</span>
        </div>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Add Game</h1>
        <p>Record your team's match results</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Season */}
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

          {/* Date */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full h-11 justify-start text-left",
                        !field.value && "text-muted-foreground"
                      )}
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
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Opponent */}
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

          {/* Scores */}
          <div className="space-y-4">
            <div className="text-center py-4 border-t border-gray-200">
              <h3>Final Score</h3>
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
          </div>

          {/* Submit */}
          <div className="pt-4">
            <Button type="submit" className="w-full" size="lg">
              Add Game
            </Button>
          </div>
        </form>
      </Form>

      {/* Edit Link */}
      <div className="mt-6">
        <Button className="w-full" asChild variant="outline" size="lg">
          <Link href="/edit">Edit Game</Link>
        </Button>
      </div>
    </div>
  );
}
