// middleware.ts
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

export async function middleware(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  console.log("Token yang ditemukan: ", token);  // Log token

  if (!token) {
    console.log("Token tidak ada, mengarahkan ke halaman login");
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET tidak terdefinisi');
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    await jwtVerify(token, secret);

    console.log("Token valid, melanjutkan request...");
    return NextResponse.next();
  } catch (error) {
    console.error('Token tidak valid:', error);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/homePage', '/spendPage', '/budgetAI', '/detailLaporanPage', '/lpj', '/rab', '/verifikasi'],
};
