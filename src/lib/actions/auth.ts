"use server";

import { signIn } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { AuthCredentials } from "@/types";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";

export async function signInWithCredentials(
  data: Pick<AuthCredentials, "email" | "password">,
) {
  const { email, password } = data;

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return {
        success: false,
        message: result.error,
      };
    }

    return {
      success: true,
      message: "Sign In Success",
    };
  } catch (error) {
    console.log("Sign In Error", error);
    return {
      success: false,
      message: "Sign In Error",
    };
  }
}

export async function signUp(data: AuthCredentials) {
  const { fullName, email, password, universityCard, universityId } = data;

  // Check if the user already exists in the database
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return {
      success: false,
      message: "User already exists",
    };
  }

  // Hash the password
  const hashedPassword = await hash(password, 10);

  try {
    await db.insert(users).values({
      fullName,
      email,
      password: hashedPassword,
      universityCard,
      universityId,
    });

    await signInWithCredentials({ email, password });

    return {
      success: true,
      message: "User created successfully",
    };
  } catch (error) {
    console.log("Sign Up Error", error);
    return {
      success: false,
      message: "Sign Up Error",
    };
  }
}
