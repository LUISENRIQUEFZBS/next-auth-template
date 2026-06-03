import { getAuthSession } from "@/lib/auth";
import ProfileMenu from "@/components/ProfileMenu";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";

export default async function Navbar() {
  const session = await getAuthSession();

  return (
    <nav
      className="
        flex items-center justify-between
        border-b
        px-6 py-3

        bg-white
        border-gray-200

        dark:bg-gray-900
        dark:border-gray-800
      "
    >
      <div
        className="
          font-bold
          text-gray-900
          dark:text-gray-100
        "
      >
        My SaaS
      </div>

      <div className="flex items-center gap-3">
        <LanguageSwitcher />
        <ThemeToggle />
        {session?.user ? (
          <ProfileMenu user={session.user} />
        ) : (
          <a
            href="/login"
            className="
              text-sm
              text-blue-600
              hover:text-blue-700

              dark:text-blue-400
              dark:hover:text-blue-300
            "
          >
            Login
          </a>
        )}
      </div>
    </nav>
  );
}