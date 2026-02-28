"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function validate() {
    if (!email || !password) {
      return "Email and password are required.";
    }
    if (!email.includes("@")) {
      return "Please enter a valid email address.";
    }
    return "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Login failed");
      setLoading(false);
      return;
    }

    router.refresh();
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 p-8 space-y-6">
        <div className="text-center space-y-1">
          <div className="text-3xl">📘</div>
          <h1 className="text-2xl font-semibold text-gray-900">
            My Library
          </h1>
          <p className="text-sm text-gray-600">
            Access your personal book collection
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <input
            type="email"
            disabled={loading}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded-lg border border-gray-300 p-3 text-gray-900"
          />

          <input
            type="password"
            disabled={loading}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-lg border border-gray-300 p-3 text-gray-900"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-green-500 py-3 font-medium text-white hover:bg-green-600 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            )}
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          New to My Library?{" "}
          <a
            href="/signup"
            className="font-medium text-green-600 hover:text-green-700"
          >
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
}