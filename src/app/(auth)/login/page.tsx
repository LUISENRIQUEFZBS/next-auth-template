"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white/10 p-8 shadow-2xl backdrop-blur-xl border border-white/10">
        
        <h1 className="text-center text-3xl font-bold text-white">
          Welcome back
        </h1>

        <p className="mt-2 text-center text-sm text-gray-300">
          Sign in to continue to your dashboard
        </p>

        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-white px-4 py-3 text-sm font-medium text-gray-900 shadow-md transition hover:bg-gray-100 active:scale-[0.98]"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="h-5 w-5"
          />
          Sign in with Google
        </button>

        <p className="mt-6 text-center text-xs text-gray-400">
          By continuing you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}