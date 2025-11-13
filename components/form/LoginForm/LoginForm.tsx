"use client";

import { useState, useEffect } from "react";
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

export default function LoginForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const subscription = form.watch(() => {
      if (form.formState.errors.root) {
        form.clearErrors("root");
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    setLoading(true);

    try {
      await login(data);
    } catch (error) {
      form.setError("root", { message: "Invalid email or password" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg min-w-[300px] sm:min-w-0 mx-auto space-y-6">
      <CardHeader className="p-0 mb-4">
        <h1 className="text-2xl font-bold text-center">Log in to 5FL</h1>
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
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="w-full"
            variant="default"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
        {form.formState.errors.root && (
          <p className="text-red-500 text-sm text-center">
            {form.formState.errors.root.message}
          </p>
        )}
      </Form>

      <div className="text-center mt-4">
        <Link href="/signup">
          <Button variant="link">Don't have an account? Sign up</Button>
        </Link>
      </div>
    </div>
  );
}
