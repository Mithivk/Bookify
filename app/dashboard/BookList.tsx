"use client";

import { useState } from "react";
import BookCard from "./BookCard";
import AddBookModal from "./AddBookModal";

export default function BookList({ books }: { books: any[] }) {
  const [open, setOpen] = useState(false);

  return (
    <section className="space-y-4">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">
          Your Books
        </h2>

        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 rounded-lg bg-black text-white text-sm font-medium"
        >
          + Add Book
        </button>
      </div>

      {/* LIST */}
      {books.length === 0 ? (
        <p className="text-gray-600">
          Your reading journey starts here.
        </p>
      ) : (
        books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))
      )}

      {/* MODAL */}
      {open && <AddBookModal onClose={() => setOpen(false)} />}
    </section>
  );
}