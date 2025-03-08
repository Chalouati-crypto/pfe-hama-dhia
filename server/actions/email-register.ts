"use server";
import { RegisterSchema } from "@/types/register-schema";
import { actionClient } from "@/lib/safe-acion";
import bcrypt from "bcryptjs";
import { db } from "..";
import { eq } from "drizzle-orm";
import { users } from "../schema";
export const emailRegister = actionClient
  .schema(RegisterSchema)
  .action(async ({ parsedInput: { email, password, name } }) => {
    try {
      //check if email already in use
      const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email),
      });
      if (existingUser) {
        return { error: "email already in use" };
      }
      //hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword);
      await db.insert(users).values({
        email,
        name,
        password: hashedPassword,
      });
    } catch (error) {
      console.log(error);
    }
  });
