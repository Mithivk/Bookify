import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

type JwtPayload = {
  userId: string;
};

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return null;

    const secret = process.env.NEXT_PUBLIC_JWT_SECRET;
    if (!secret) return null;

    const decoded = jwt.verify(token, secret) as JwtPayload;

    await connectDB();
    const user = await User.findById(decoded.userId).select("-password");
    console.log("getCurrentUser user:", user);
    return user ?? null;
  } catch (err) {
    console.error("getCurrentUser error:", err);
    return null;
  }
}