// app/login/page.tsx
import { getCurrentUser } from "@/lib/getCurrentUser";
import { redirect } from "next/navigation";
import LoginForm from "../../../components/auth/LoginForm";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user) redirect("/dashboard");

  return <LoginForm />;
}