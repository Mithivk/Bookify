// app/dashboard/page.tsx
import { getCurrentUser } from "@/lib/getCurrentUser";
import { redirect } from "next/navigation";
import DashboardStats from "./DashboardStats";
import BookList from "./BookList";
import { cookies } from "next/headers";
import { Suspense } from "react";
import BookLoader from "../components/BookLoader";
import LogoutButton from "../components/LogOutBUtton";
async function getBooks() {
  const cookieStore = await cookies();
  const res = await fetch("/api/books", {
    cache: "no-store",
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  if (!res.ok) throw new Error("Failed to fetch books");
  return res.json();
}

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const books = await getBooks();

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-10 bg-gradient-to-b from-amber-500 to-amber-700 rounded-lg shadow-md flex items-center justify-center">
              <span className="text-white text-sm">📚</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">
              My Library
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 bg-stone-100 px-3 py-1 rounded-full">
              {user.name}
            </span>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        <Suspense fallback={<div className="h-32 animate-pulse bg-stone-200 rounded-xl" />}>
          <DashboardStats books={books} />
        </Suspense>
        
        <Suspense fallback={<BookLoader />}>
          <BookList books={books} />
        </Suspense>
      </main>
    </div>
  );
}