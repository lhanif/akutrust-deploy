
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({ success: true, message: "Logout berhasil" });

    // Hapus cookie dengan nama 'token'
    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Pastikan secure hanya di production
      path: "/",
      maxAge: -1, // Set maxAge ke -1 untuk menghapus cookie
    });

    return response;
  } catch (error) {
    console.error("Terjadi kesalahan saat logout:", error);
    return NextResponse.json({ success: false, message: "Terjadi kesalahan pada server" }, { status: 500 });
  }
}
