"use client";

import { useEffect, useRef, useState } from "react";
import { signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  UserIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

type User = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: "user" | "admin";
};

export default function ProfileMenu({ user }: { user: User }) {
  const params = useParams();
  const locale = params.locale as string;

  const t = useTranslations("profile");

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const image = user.image?.replace("s96-c", "s400-c");

  return (
    <div className="relative" ref={ref}>
      {/* Avatar */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full focus:outline-none"
      >
        {user.image ? (
          <Image
            src={image || ""}
            width={36}
            height={36}
            className="rounded-full border object-cover"
            alt="avatar"
          />
        ) : (
          <div className="h-9 w-9 rounded-full bg-gray-300 dark:bg-gray-700" />
        )}
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-60 rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-700 shadow-lg overflow-hidden z-50"
          >
            {/* User Info */}
            <div className="px-4 py-3 border-b dark:border-gray-700">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {user.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user.email}
              </p>

              {user.role === "admin" && (
                <span className="mt-1 inline-flex items-center gap-1 text-xs text-blue-600">
                  <ShieldCheckIcon className="h-3 w-3" />
                  {t("admin")}
                </span>
              )}
            </div>

            {/* Menu */}
            <button className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">
              <UserIcon className="h-4 w-4" />
              {t("myProfile")}
            </button>

            <button className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">
              <Cog6ToothIcon className="h-4 w-4" />
              {t("settings")}
            </button>

            {/* Admin only */}
            {user.role === "admin" && (
              <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-800">
                <ShieldCheckIcon className="h-4 w-4" />
                {t("adminPanel")}
              </button>
            )}

            <div className="border-t dark:border-gray-700" />

            {/* Logout */}
            <button
              onClick={() =>
                signOut({ callbackUrl: `/${locale}/login` })
              }
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ArrowRightOnRectangleIcon className="h-4 w-4" />
              {t("signOut")}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}