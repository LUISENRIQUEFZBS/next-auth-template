import { redirect } from "next/navigation";

export default function RootPage() {
  const defaultLocale = "en";
  redirect(`/${defaultLocale}`);
}