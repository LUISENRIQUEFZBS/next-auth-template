"use client";

import { signOut } from "next-auth/react";
import { useParams } from "next/navigation";

export default function LogoutButton() {
  const params = useParams();
  const locale = params.locale as string;

  return (
    <button
      onClick={() =>
        signOut({
          callbackUrl: `/${locale}/login`,
        })
      }
      className="text-sm text-red-500 hover:text-red-600"
    >
      Sign out
    </button>
  );
}