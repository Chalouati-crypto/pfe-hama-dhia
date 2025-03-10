"use server";
import { LoginSchema } from "@/types/login-schema";
import { actionClient } from "@/lib/safe-acion";
import { db } from "..";
import { eq } from "drizzle-orm";
import { users } from "../schema";
import { signIn } from "../auth";
export const emailSignIn = actionClient
  .schema(LoginSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    if (existingUser?.email !== email) {
      return { error: "Email not found" };
    }

    await signIn("credentials", {
      email,
      password,
      redirectTo: "/articles/new",
    });

    return { success: "User Signed in!" };
  });
