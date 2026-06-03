"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LanguageIcon,
  ChevronDownIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();
  const params = useParams();

  const currentLocale = params.locale as string;

  const pathWithoutLocale = pathname.replace(/^\/(en|es)/, "");

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const languages = [
    {
      code: "en",
      label: "English",
    },
    {
      code: "es",
      label: "Español",
    },
  ];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      >
        <LanguageIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />

        <span>
          {currentLocale === "es" ? "Español" : "English"}
        </span>

        <ChevronDownIcon
          className={`h-4 w-4 text-gray-700 dark:text-gray-300 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-44 overflow-hidden rounded-xl border bg-white shadow-lg dark:bg-gray-900 dark:border-gray-800 z-50"
          >
            {languages.map((language) => (
              <Link
                key={language.code}
                href={`/${language.code}${pathWithoutLocale}`}
                className="flex items-center justify-between px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setOpen(false)}
              >
                <span>{language.label}</span>

                {currentLocale === language.code && (
                  <CheckIcon className="h-4 w-4" />
                )}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}