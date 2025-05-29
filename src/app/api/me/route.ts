// src/app/api/me/route.ts

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";

export async function GET() {
  const cookieStore = cookies();
  console.log("Semua cookie di server:", (await cookieStore).getAll());

  const token = (await cookieStore).get("token")?.value;

  if (!token) {
    return NextResponse.json({ success: false, message: "Tidak ada token" }, { status: 401 });
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);
    console.log("📦 Cookies server:", token);

    await connectDB();
    const user = await User.findById(payload.id).select("-password"); // hapus password

    if (!user) {
      return NextResponse.json({ success: false, message: "User tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error) {
    console.error("Error verifikasi token:", error);
    return NextResponse.json({ success: false, message: "Token tidak valid" }, { status: 401 });
  }
}
