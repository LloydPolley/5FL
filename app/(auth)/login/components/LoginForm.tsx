"use client";

import { Volleyball } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";

import { login } from "../actions";

const initState = { message: "" };

export default function LoginForm() {
  const [formStateSignup, formActionSignup] = useActionState(login, initState);

  return (
    <form
      className="w-full max-w-sm p-8 space-y-6 text-left mx-auto mt-[-100px]"
      action={formActionSignup}
    >
      <div className="mx-auto size-16 relative text-black">
        <Volleyball className="size-16" />
      </div>

      <h1 className="text-3xl font-extrabold text-gray-800 text-center">
        Sign in
      </h1>

      <input
        id="email"
        type="email"
        name="email"
        placeholder="Email Address"
        className="input-form"
        required
      />

      <input
        id="password"
        type="text"
        name="password"
        placeholder="Password"
        className="input-form"
        required
      />

      {formStateSignup?.message && (
        <p className="text-red-500 text-center">{formStateSignup.message}</p>
      )}

      <div className="flex flex-col gap-3">
        <button type="submit" className="main-btn">
          Log in
        </button>
      </div>
      <Link
        className="text-center text-gray-800 underline mt-10"
        href={"/signup"}
      >
        No Account? Sign up
      </Link>
    </form>
  );
}
