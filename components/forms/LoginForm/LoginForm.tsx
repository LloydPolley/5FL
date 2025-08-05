"use client";

import { Volleyball } from "lucide-react";
import { useActionState } from "react";
import Link from "next/link";

import { login } from "@/actions/auth/login";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Card, CardHeader } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "./schema";
import z from "zod";

export default function SignUpForm() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    console.log("data", data);
    await login(data);
  };

  return (
    <Card className="p-8 w-full max-w-lg min-w-[300px] sm:min-w-0 mx-auto space-y-6">
      <CardHeader className="p-0 mb-4">
        <h1 className="text-2xl font-bold text-center">Sign in</h1>
      </CardHeader>

      <Form {...form}>
        <form
          className="flex flex-col gap-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full" variant="default" type="submit">
            Sign In
          </Button>
        </form>
      </Form>

      <div className="text-center mt-4">
        <Link href="/signup">
          <Button variant="link">Don't have an account? Sign up</Button>
        </Link>
      </div>
    </Card>
  );
}
