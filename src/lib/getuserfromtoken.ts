import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function getUserFromToken() {
  const cookieStore = await cookies(); // <-- tambahkan await
  const token = cookieStore.get("token")?.value;
  if (!token) return null;

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);
    return payload; // contoh: { id, email, name, role }
  } catch (error) {
    console.error("Token tidak valid", error);
    return null;
  }
}
