"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BookCard({ book }: { book: any }) {
  const router = useRouter();

  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [tags, setTags] = useState(book.tags?.join(", ") || "");
  const [status, setStatus] = useState(book.status);

  if (!book) return null;

  async function updateStatus(status: string) {
    await fetch(`/api/books/${book._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    router.refresh();
  }

  async function saveEdit() {
    await fetch(`/api/books/${book._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        author,
        status,
        tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      }),
    });

    setShowEdit(false);
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
        {/* LEFT */}
        <div className="space-y-2">
          <div>
            <h3 className="font-semibold text-gray-900">
              📘 {book.title}
            </h3>
            <p className="text-sm text-gray-700">
              ✍️ {book.author}
            </p>
          </div>

          {/* TAGS */}
          {Array.isArray(book.tags) && book.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {book.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded-full bg-stone-100 text-stone-700 border"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT */}
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

          <div className="flex gap-3 text-sm font-medium">
            <button
              onClick={() => setShowEdit(true)}
              className="text-blue-600"
            >
              ✏️ Edit
            </button>

            <button
              onClick={() => setShowDelete(true)}
              className="text-red-600"
            >
              🗑 Delete
            </button>
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      {showEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 text-gray-700">
          <div className="bg-white rounded-xl p-6 w-full max-w-md space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Edit Book
            </h3>

            <div className="space-y-3">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Title"
              />

              <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Author"
              />

              <input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Tags (comma separated)"
              />

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="WANT_TO_READ">Want to Read</option>
                <option value="READING">Reading</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setShowEdit(false)}
                className="px-4 py-2 text-sm text-gray-600"
              >
                Cancel
              </button>

              <button
                onClick={saveEdit}
                className="px-4 py-2 text-sm bg-black text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
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