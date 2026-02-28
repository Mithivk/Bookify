import { connectDB } from "@/lib/db";
import Book from "@/models/Book";

export async function getBooks(userId: string) {
  await connectDB();
  const books = await Book.find({ userId }).lean();
  return books;
}