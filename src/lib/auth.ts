import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

export const SESSION_COOKIE = "komfy_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 gün

export type Role = "admin" | "operator";

export interface Session {
  userId: string;
  email: string;
  name: string;
  role: Role;
}

function secret(): Uint8Array {
  const s = process.env.AUTH_SECRET || "komfy-local-dev-secret";
  return new TextEncoder().encode(s);
}

export async function createSessionToken(session: Session): Promise<string> {
  return new SignJWT({ ...session })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(secret());
}

export async function verifySessionToken(token: string): Promise<Session | null> {
  try {
    const { payload } = await jwtVerify(token, secret());
    return {
      userId: String(payload.userId),
      email: String(payload.email),
      name: String(payload.name),
      role: payload.role === "admin" ? "admin" : "operator",
    };
  } catch {
    return null;
  }
}

// Email/parolu yoxlayır, uğurlu olsa Session qaytarır
export async function authenticate(
  email: string,
  password: string
): Promise<Session | null> {
  const user = await prisma.user.findUnique({ where: { email: email.trim().toLowerCase() } });
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return null;
  return {
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role === "admin" ? "admin" : "operator",
  };
}

export async function setSessionCookie(session: Session): Promise<void> {
  const token = await createSessionToken(session);
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

// Server komponentləri / route handler-lər üçün cari sessiya
export async function getSession(): Promise<Session | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export function roleLabel(role: Role): string {
  return role === "admin" ? "Admin — tam giriş" : "Satış operatoru";
}
