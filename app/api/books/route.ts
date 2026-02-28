import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Book from "@/models/Book";
import { getCurrentUser } from "@/lib/getCurrentUser";

/**
 * GET /api/books
 * Fetch all books for the logged-in user
 */
export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const books = await Book.find({ userId: user._id }).sort({ createdAt: -1 });

  return NextResponse.json(books);
}

/**
 * POST /api/books
 * Add a new book to the user's collection
 */
export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, author, tags, status } = await req.json();

  if (!title || !author) {
    return NextResponse.json(
      { error: "Title and author are required" },
      { status: 400 }
    );
  }

  await connectDB();

  const book = await Book.create({
    userId: user._id,
    title,
    author,
    tags: tags || [],
    status: status || "WANT_TO_READ",
  });

  return NextResponse.json(book, { status: 201 });
}