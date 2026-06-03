"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow">
        <h1 className="mb-6 text-center text-2xl font-bold">
          Welcome Back
        </h1>

        <button
          onClick={() => signIn("google")}
          className="w-full rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}