"use client";

import { signIn } from "next-auth/react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

export default function LoginPage() {
  const params = useParams();
  const locale = params.locale as string;

  const t = useTranslations("login");

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 px-4">
      
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-white/10 p-8 shadow-2xl backdrop-blur-xl border border-gray-200 dark:border-white/10">
        
        <h1 className="text-center text-3xl font-bold text-gray-900 dark:text-white">
          {t("title")}
        </h1>

        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
          {t("subtitle")}
        </p>

        <button
          onClick={() =>
            signIn("google", {
              callbackUrl: `/${locale}/dashboard`,
            })
          }
          className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-gray-900 text-white dark:bg-white dark:text-gray-900 px-4 py-3 text-sm font-medium shadow-md transition hover:opacity-90 active:scale-[0.98]"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="h-5 w-5"
          />
          {t("google")}
        </button>

        <p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
          {t("terms")}
        </p>
      </div>
    </div>
  );
}