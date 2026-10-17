import { NextResponse } from "next/server";
import { getSession, type Session } from "./auth";

// Admin API-ları üçün ortaq yoxlama. adminOnly=true olduqda yalnız admin rolu keçir.
export async function guard(
  opts?: { adminOnly?: boolean }
): Promise<{ session: Session } | NextResponse> {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Giriş tələb olunur" }, { status: 401 });
  }
  if (opts?.adminOnly && session.role !== "admin") {
    return NextResponse.json(
      { error: "Bu əməliyyat üçün admin səlahiyyəti lazımdır" },
      { status: 403 }
    );
  }
  return { session };
}
