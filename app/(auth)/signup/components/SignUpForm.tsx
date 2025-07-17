"use client";

import { Volleyball } from "lucide-react";
import { useActionState } from "react";

import { signup } from "../actions";

const initState = { message: "" };

export default function SignUpForm() {
  const [formStateSignup, formActionSignup] = useActionState(signup, initState);

  return (
    <form
      className="w-full max-w-sm p-8 space-y-6 text-left"
      action={formActionSignup}
    >
      <div className="mx-auto size-16 relative text-black">
        <Volleyball className="size-16" />
      </div>

      <h1 className="text-3xl font-extrabold text-gray-800 text-center">
        Create an Account
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
        type="password"
        name="password"
        placeholder="Password"
        className="input-form"
        required
      />

      <input
        id="name"
        type="name"
        name="name"
        placeholder="First Name"
        className="input-form"
        required
      />

      {formStateSignup?.message && (
        <p className="text-red-500 text-center">{formStateSignup.message}</p>
      )}

      <div className="flex flex-col gap-3">
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 text-white font-semibold py-4 hover:bg-blue-700 transition"
        >
          Create
        </button>
      </div>
    </form>
  );
}
