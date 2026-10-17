import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { defaultLocale, isLocale } from "@/i18n/config";

const SESSION_COOKIE = "komfy_session";

function secret(): Uint8Array {
  const s = process.env.AUTH_SECRET || "komfy-local-dev-secret";
  return new TextEncoder().encode(s);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ---- Admin (lokalizə olunmur) ----
  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") return NextResponse.next();
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    let valid = false;
    if (token) {
      try {
        await jwtVerify(token, secret());
        valid = true;
      } catch {
        valid = false;
      }
    }
    if (!valid) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // API, _next və statik fayllar — toxunma
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // ---- Dil (locale) ----
  const seg = pathname.split("/")[1];
  if (isLocale(seg)) {
    // Cari dili server komponentlərinə ötür (<html lang> üçün)
    const headers = new Headers(request.headers);
    headers.set("x-locale", seg);
    return NextResponse.next({ request: { headers } });
  }

  // Dil prefiksi yoxdur → əsas dilə yönləndir
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
