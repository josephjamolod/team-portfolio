"use server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const createSession = async (uid: string) => {
  const token = jwt.sign({ uid }, "samplesecret", {
    expiresIn: "1h",
  });

  (await cookies()).set("user_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  // redirect(ONBOARDING_ROUTE);
};

export const deleteSession = async () => {
  (await cookies()).delete("user_session");
  // redirect(ROOT_ROUTE);
};

export const getSession = async () => {
  const sessionCookie = await (await cookies()).get("user_session");
  if (!sessionCookie) return;
  return sessionCookie.value;
};

export const signUserId = async (uid: string) => {
  return jwt.sign({ uid }, "samplesecret", {
    expiresIn: "1h",
  });
};

export const verifySignUserId = async (token: string) => {
  try {
    const data = await jwt.verify(token, "samplesecret");
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
