import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Proyek from '@/lib/models/Proyek';
import { getTokenFromCookies } from '@/lib/auth';
import { jwtVerify } from 'jose';

export async function GET() {
  try {
    await connectDB();

    // Ambil dan verifikasi token
    const token = await getTokenFromCookies();
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);
    const userId = payload.id;

    // Ambil proyek berdasarkan user login
    const proyekList = await Proyek.find({ id_user: userId }).sort({ created_at: -1 });

    return NextResponse.json(proyekList, { status: 200 });
  } catch (error: any) {
    console.error('🔥 Gagal fetch proyek:', error);
    return NextResponse.json(
      {
        message: 'Terjadi kesalahan saat mengambil data proyek',
        error: error?.message || 'Unknown error',
        detail: JSON.stringify(error, Object.getOwnPropertyNames(error)),
      },
      { status: 500 }
    );
  }
}
