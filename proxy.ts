import { NextResponse, type NextRequest } from "next/server";

// Dashboard access gate.
//
// Priority:
//   1. DASHBOARD_ENABLED=1  → always open (kill-switch: force on)
//   2. DASHBOARD_ENABLED=0  → always blocked
//   3. Not Vercel production (preview / dev)  → open
//   4. Vercel production:
//        - if DASHBOARD_ACCESS_TOKEN is set, allow when the request has
//          matching cookie `zova_dash` OR `?key=<token>` in the URL
//          (in which case we set the cookie and redirect to strip the key).
//        - otherwise → blocked (404).
//
// Share `https://<domain>/dashboard?key=<token>` with people who need to view
// the dashboard in production.

const COOKIE = "zova_dash";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function isForcedOn() {
  const v = process.env.DASHBOARD_ENABLED;
  return v === "1" || v === "true";
}
function isForcedOff() {
  const v = process.env.DASHBOARD_ENABLED;
  return v === "0" || v === "false";
}
function isProd() {
  return process.env.VERCEL_ENV === "production";
}

export function proxy(req: NextRequest) {
  if (isForcedOff()) return block(req);
  if (isForcedOn()) return NextResponse.next();
  if (!isProd()) return NextResponse.next();

  const token = process.env.DASHBOARD_ACCESS_TOKEN;
  if (!token) return block(req);

  const url = req.nextUrl;
  const key = url.searchParams.get("key");
  if (key && key === token) {
    // Strip ?key= from URL, set cookie, redirect.
    const clean = new URL(url.toString());
    clean.searchParams.delete("key");
    const res = NextResponse.redirect(clean);
    res.cookies.set(COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      maxAge: COOKIE_MAX_AGE,
      path: "/dashboard",
    });
    return res;
  }

  if (req.cookies.get(COOKIE)?.value === token) {
    return NextResponse.next();
  }

  return block(req);
}

function block(req: NextRequest) {
  return NextResponse.rewrite(new URL("/404", req.url));
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
