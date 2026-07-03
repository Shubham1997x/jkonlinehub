"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createSession, destroySession, verifyCredentials } from "@/lib/auth";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export type LoginState = {
  error?: string;
};

export async function login(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: "Please enter a username and password." };
  }

  const { username, password } = parsed.data;

  if (!verifyCredentials(username, password)) {
    return { error: "Invalid username or password." };
  }

  await createSession();

  const redirectTo = formData.get("redirectTo");
  redirect(typeof redirectTo === "string" && redirectTo ? redirectTo : "/admin/dashboard");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}
