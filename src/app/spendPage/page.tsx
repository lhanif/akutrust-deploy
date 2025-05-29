import SpendPageComponent from "@/components/pages/spendPage/spendPage";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";

async function getProjects() {
  const cookieStore = cookies();
  const tokenCookie = (await cookieStore).get('token');

  if (!tokenCookie) {
    console.error('Token tidak ditemukan di cookie');
    return [];
  }

  const baseUrl = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3000' 
    : process.env.NEXT_PUBLIC_BASE_URL!;

  const res = await fetch(`${baseUrl}/api/projects`, {
    cache: 'no-store',
    headers: {
      cookie: `token=${tokenCookie.value}`,
    },
  });

  if (!res.ok) {
    console.error('Fetch proyek gagal dengan status:', res.status);
    return [];
  }

  return await res.json();
}

export default async function SpendPage() {
  const projects = await getProjects();

  return <SpendPageComponent projects={projects}/>;
}