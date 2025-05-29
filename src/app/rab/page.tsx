import RabPage from '@/components/pages/spendPage/rab';
import { cookies } from "next/headers";

async function getProjects() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token");

  if (!token) return [];

  const baseUrl = process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.NEXT_PUBLIC_BASE_URL!;

  const res = await fetch(`${baseUrl}/api/projects`, {
    cache: "no-store",
    headers: {
      cookie: `token=${token.value}`,
    },
  });

  if (!res.ok) return [];

  return await res.json();
}

export default async function Page() {
  const projects = await getProjects();

  return <RabPage projects={projects}/>;
}