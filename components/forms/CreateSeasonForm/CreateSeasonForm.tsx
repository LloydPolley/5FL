"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { createSeason } from "@/actions/seasons/createSeason";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const schema = z.object({
  seasonName: z.string().min(1, "Season name is required"),
  startDate: z.date({ required_error: "Start date is required" }),
});

type FormValues = z.infer<typeof schema>;

export default function CreateSeasonForm() {
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      seasonName: "",
      startDate: new Date(),
    },
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setServerMessage(null);

    try {
      await createSeason({
        seasonName: data.seasonName,
        startDate: format(data.startDate, "yyyy-MM-dd"),
      });
      setServerMessage("Season added successfully!");
      form.reset();
    } catch (error: any) {
      setServerMessage(error?.message || "Failed to add season.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-8 w-full max-w-lg min-w-[400px] sm:min-w-0 mx-auto space-y-6">
      <CardHeader className="p-0 mb-4">
        <h1 className="text-2xl font-bold text-center">Add Season</h1>
      </CardHeader>
      <CardContent>
        {serverMessage && (
          <p
            className={`text-center mb-4 ${
              serverMessage.includes("successfully")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {serverMessage}
          </p>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="seasonName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Season Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter season name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
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
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Adding..." : "Add Season"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
