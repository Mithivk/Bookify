"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BookCard({ book }: { book: any }) {
  const router = useRouter();
  const [showDelete, setShowDelete] = useState(false);

  if (!book) return null;

  async function updateStatus(status: string) {
    await fetch(`/api/books/${book._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    router.refresh();
  }

  async function updateBook() {
    const title = prompt("Edit title", book.title);
    const author = prompt("Edit author", book.author);

    if (!title || !author) return;

    await fetch(`/api/books/${book._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author }),
    });

    router.refresh();
  }

  async function deleteBook() {
    await fetch(`/api/books/${book._id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <>
      {/* BOOK CARD */}
      <div className="bg-white border rounded-xl p-5 flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-900">
            📘 {book.title}
          </h3>
          <p className="text-sm text-gray-700">
            ✍️ {book.author}
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <select
            value={book.status}
            onChange={(e) => updateStatus(e.target.value)}
            className="border rounded px-2 py-1 text-sm font-medium text-gray-800"
          >
            <option value="WANT_TO_READ">📖 Want to Read</option>
            <option value="READING">📘 Reading</option>
            <option value="COMPLETED">✅ Completed</option>
          </select>

          <button
            onClick={() => setShowDelete(true)}
            className="text-red-600 text-sm font-medium"
          >
            🗑 Delete
          </button>
        </div>
      </div>

      {/* DELETE CONFIRM MODAL */}
      {showDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Delete book?
            </h3>

            <p className="text-sm text-gray-600">
              Are you sure you want to delete{" "}
              <span className="font-medium">{book.title}</span>?
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowDelete(false)}
                className="px-4 py-2 text-sm text-gray-600"
              >
                Cancel
              </button>

              <button
                onClick={deleteBook}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}