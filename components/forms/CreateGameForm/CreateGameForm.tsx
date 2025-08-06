"use client";

import { createGame } from "@/actions/games/createGame";
import ScoreWidget from "@components/ScoreWidget/ScoreWidget";
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
import { Card, CardHeader } from "@/components/ui/card";
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
    <Card className="p-8 w-full max-w-lg min-w-[300px] sm:min-w-0 mx-auto space-y-6">
      <CardHeader className="p-0 mb-4">
        <h1 className="text-2xl font-bold text-center">Add Game</h1>
      </CardHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
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
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
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

          <FormField
            control={form.control}
            name="opponentName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Opponent Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Opponent Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

          <Button type="submit" className="w-full">
            Add Game
          </Button>
        </form>
      </Form>
    </Card>
  );
}
