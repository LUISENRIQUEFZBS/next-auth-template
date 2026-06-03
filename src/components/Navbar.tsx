import { getAuthSession } from "@/lib/auth";
import ProfileMenu from "@/components/ProfileMenu";

export default async function Navbar() {
  const session = await getAuthSession();

  return (
    <nav className="flex items-center justify-between border-b px-6 py-3 bg-white">
      <div className="font-bold">My SaaS</div>

      <div className="flex items-center gap-3">
        {session?.user ? (
          <ProfileMenu user={session.user} />
        ) : (
          <a href="/login" className="text-sm text-blue-600">
            Login
          </a>
        )}
      </div>
    </nav>
  );
}