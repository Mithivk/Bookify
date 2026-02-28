import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function getCurrentUser() {
  const cookieStore = await cookies(); // ✅ IMPORTANT
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const { userId } = verifyToken(token);

    await connectDB();
    const user = await User.findById(userId).select("-password");

    return user;
  } catch {
    return null;
  }
}