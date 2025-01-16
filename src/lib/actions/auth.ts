"use server";

import { signIn } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { AuthCredentials } from "@/types";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import config from "../config";
import { ratelimit } from "../reate-limit";
import { workflowClient } from "../workflow";

export async function signInWithCredentials(
  data: Pick<AuthCredentials, "email" | "password">,
) {
  const { email, password } = data;

  // Rate Limit
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    redirect("/too-many-requests");
  }

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

  // Rate Limit
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    redirect("/too-many-requests");
  }

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

    await workflowClient.trigger({
      url: `${config.env.prodApiEndPoint}/api/workflows/onboarding`,
      body: {
        email,
        fullName,
      },
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
