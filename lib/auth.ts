import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "node:crypto";

const COOKIE_NAME = "admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET env var is not set");
  return secret;
}

function sign(payload: string) {
  return crypto.createHmac("sha256", getSecret()).update(payload).digest("hex");
}

function createSessionToken(): string {
  const payload = JSON.stringify({ exp: Date.now() + SESSION_TTL_MS });
  const encoded = Buffer.from(payload).toString("base64url");
  const signature = sign(encoded);
  return `${encoded}.${signature}`;
}

function verifySessionToken(token: string): boolean {
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return false;
  const expectedSignature = sign(encoded);
  const sigBuf = Buffer.from(signature);
  const expectedBuf = Buffer.from(expectedSignature);
  if (sigBuf.length !== expectedBuf.length) return false;
  if (!crypto.timingSafeEqual(sigBuf, expectedBuf)) return false;

  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString());
    return typeof payload.exp === "number" && payload.exp > Date.now();
  } catch {
    return false;
  }
}

export function verifyCredentials(username: string, password: string): boolean {
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminUsername || !adminPassword) return false;

  const usernameBuf = Buffer.from(username.padEnd(adminUsername.length));
  const adminUsernameBuf = Buffer.from(adminUsername.padEnd(username.length));
  const usernameMatches =
    usernameBuf.length === adminUsernameBuf.length &&
    crypto.timingSafeEqual(usernameBuf, adminUsernameBuf) &&
    username.length === adminUsername.length;

  const passwordBuf = Buffer.from(password.padEnd(adminPassword.length));
  const adminPasswordBuf = Buffer.from(adminPassword.padEnd(password.length));
  const passwordMatches =
    passwordBuf.length === adminPasswordBuf.length &&
    crypto.timingSafeEqual(passwordBuf, adminPasswordBuf) &&
    password.length === adminPassword.length;

  return usernameMatches && passwordMatches;
}

export async function createSession() {
  const store = await cookies();
  store.set(COOKIE_NAME, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  });
}

export async function destroySession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifySessionToken(token);
}

export async function requireAdmin() {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }
}

export { COOKIE_NAME, verifySessionToken };
