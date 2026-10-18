import { cookies } from "next/headers";
import crypto from "crypto";

const ADMIN_COOKIE_NAME = "adakepri_admin_session";
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60; // 7 days in seconds

function getSecretKey(): string {
  return (
    process.env.AUTH_SECRET ||
    process.env.ADMIN_PASSWORD ||
    "adakepri-super-secret-admin-session-salt-2026"
  );
}

/**
 * Sign data with HMAC SHA256
 */
function signPayload(dataString: string): string {
  const secret = getSecretKey();
  const signature = crypto
    .createHmac("sha256", secret)
    .update(dataString)
    .digest("base64url");
  return `${Buffer.from(dataString).toString("base64url")}.${signature}`;
}

/**
 * Verify and decode HMAC SHA256 signed payload
 */
function verifyPayload(token: string): any | null {
  try {
    const [encodedData, signature] = token.split(".");
    if (!encodedData || !signature) return null;

    const dataString = Buffer.from(encodedData, "base64url").toString("utf-8");
    const expectedSignature = crypto
      .createHmac("sha256", getSecretKey())
      .update(dataString)
      .digest("base64url");

    if (
      crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(expectedSignature)
      )
    ) {
      const parsed = JSON.parse(dataString);
      if (parsed.exp && parsed.exp > Date.now()) {
        return parsed;
      }
    }
    return null;
  } catch (e) {
    return null;
  }
}

/**
 * Create an isolated admin session cookie
 */
export async function createAdminSession(username: string) {
  const payload = {
    username: username.trim().toLowerCase(),
    role: "ADMIN",
    exp: Date.now() + COOKIE_MAX_AGE * 1000,
  };

  const token = signPayload(JSON.stringify(payload));
  const cookieStore = await cookies();

  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });

  return token;
}

/**
 * Verify if the current request has an active valid admin session
 */
export async function verifyAdminSession(): Promise<{ username: string; role: "ADMIN" } | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    if (!token) return null;

    const payload = verifyPayload(token);
    if (!payload || payload.role !== "ADMIN") return null;

    const envAdminUser = (process.env.ADMIN_USERNAME || "admin").trim().toLowerCase();
    if (payload.username !== envAdminUser) {
      return null;
    }

    return {
      username: payload.username,
      role: "ADMIN",
    };
  } catch (e) {
    return null;
  }
}

/**
 * Destroy the admin session cookie on logout
 */
export async function destroyAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}
