"use client";

import { Volleyball } from "lucide-react";
import { useActionState } from "react";
import Link from "next/link";

import { signup } from "@/actions/auth/signup";

const initState = { message: "" };

export default function SignUpForm() {
  const [formStateSignup, formActionSignup] = useActionState(signup, initState);

  return (
    <form
      className="w-full max-w-sm p-8 space-y-6 text-left mx-auto"
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

      <input
        id="teamName"
        type="teamName"
        name="teamName"
        placeholder="Team Name"
        className="input-form"
        required
      />

      {formStateSignup?.message && (
        <p className="text-red-500 text-center">{formStateSignup.message}</p>
      )}

      <div className="flex flex-col gap-3">
        <button type="submit" className="main-btn">
          Create
        </button>
      </div>
      <Link
        className="text-center text-gray-800 underline mt-10"
        href={"/login"}
      >
        Already have an account? Log in
      </Link>
    </form>
  );
}
