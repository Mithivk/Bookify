// components/AddBookModal.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  onClose: () => void;
};

export default function AddBookModal({ onClose }: Props) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState("WANT_TO_READ");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!title.trim() || !author.trim()) {
      setError("Title and author are required");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        author,
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        status,
      }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Failed to add book");
      return;
    }

    window.location.reload();
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white rounded-2xl p-6 space-y-5 shadow-2xl">
            {/* Decorative book header */}
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex items-center gap-3 mb-2"
            >
              <div className="w-10 h-12 bg-gradient-to-b from-amber-500 to-amber-700 rounded-lg shadow-md flex items-center justify-center">
                <span className="text-white text-xl">📕</span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Add a new book
                </h2>
                <p className="text-sm text-gray-500">
                  Expand your literary journey
                </p>
              </div>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-sm text-red-500 bg-red-50 p-3 rounded-lg"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <label className="text-sm font-medium text-gray-700">Title</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Atomic Habits"
                  className="mt-1 w-full border rounded-lg p-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-gray-700"
                />
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <label className="text-sm font-medium text-gray-700">Author</label>
                <input
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g., James Clear"
                  className="mt-1 w-full border rounded-lg p-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-gray-700"
                />
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <label className="text-sm font-medium text-gray-700">
                  Tags <span className="text-gray-400 font-normal">(comma separated)</span>
                </label>
                <input
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="self-help, habits, productivity"
                  className="mt-1 w-full border rounded-lg p-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-gray-700"
                />
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <label className="text-sm font-medium text-gray-700">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="mt-1 w-full border rounded-lg p-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-gray-700"
                >
                  <option value="WANT_TO_READ">📖 Want to Read</option>
                  <option value="READING">📘 Currently Reading</option>
                  <option value="COMPLETED">✅ Completed</option>
                </select>
              </motion.div>

              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex justify-end gap-3 pt-4"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 text-white text-sm font-medium disabled:opacity-60 shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <span>📚</span>
                      <span>Add to Library</span>
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}