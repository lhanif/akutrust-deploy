import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { generateToken } from "@/lib/jwt";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    
    await connectDB();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Email tidak ditemukan" },
        { status: 401 }
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json(
        { success: false, message: "Password salah" },
        { status: 401 }
      );
    }

    const token = await generateToken({
      id: user._id.toString(),
      email: user.email,
      name: user.name, // tambahkan ini

    });

    const response = NextResponse.json(
      { success: true, message: "Login berhasil" },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: false,
      path: "/",
      maxAge: 60 * 60, // 1 jam
    });

    return response;
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}

