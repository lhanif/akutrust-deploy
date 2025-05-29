import { cookies } from 'next/headers';

export async function getTokenFromCookies() {
  const cookieStore = cookies();
  return (await cookieStore).get('token')?.value || null;
}
