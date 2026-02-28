"use client";

import { useState } from "react";
import BookCard from "./BookCard";

export default function BookList({ books }: { books: any[] }) {
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [tagFilter, setTagFilter] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const filteredBooks = books.filter((book) => {
  const statusMatch =
    statusFilter === "ALL" || book.status === statusFilter;

  const tagMatch =
    !tagFilter ||
    (Array.isArray(book.tags) &&
      book.tags.some((tag: string) =>
        tag.toLowerCase().includes(tagFilter.toLowerCase().trim())
      ));

  return statusMatch && tagMatch;
});

  return (
    <div className="space-y-4">
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
      {/* FILTER BAR */}
      <div className="flex flex-wrap gap-3 items-center text-gray-700">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm"
        >
          <option value="ALL">All Statuses</option>
          <option value="WANT_TO_READ">Want to Read</option>
          <option value="READING">Reading</option>
          <option value="COMPLETED">Completed</option>
        </select>

        <input
          type="text"
          placeholder="Filter by tag"
          value={tagFilter}
          onChange={(e) => setTagFilter(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm"
        />
      </div>

      {/* BOOK LIST */}
      {filteredBooks.length === 0 ? (
        <p className="text-sm text-gray-600">
          No books match the selected filters.
        </p>
      ) : (
        filteredBooks.map((book) => (
          <BookCard key={book._id} book={book} />
        ))
      )}
    </div>
  );
}