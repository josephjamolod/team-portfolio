"use client";

import { signOutHandler } from "@/src/lib/firebase/config/auth";
import { firebaseAuth } from "@/src/lib/firebase/config/firebase";
import {
  createSession,
  deleteSession,
  getSession,
  signUserId,
  verifySignUserId,
} from "@/src/lib/firebase/config/session";
import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export type SignedUserIdJwtPayload = {
  uid: string;
  iat: number;
  exp: number;
};

export function useUserSession(initSession: string | null = null) {
  const [userUid, setUserUid] = useState<string | null>(initSession);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const signOutUser = async () => {
    await signOutHandler();
    setUserUid(null);
    setUser(null);
  };

  const signOutIfInvalidSession = async (authUser: User) => {
    const sessionCookie = await getSession();
    const signUser = await signUserId(authUser.uid);

    const cookie = sessionCookie ?? signUser;

    const cookieSession = (await verifySignUserId(
      cookie
    )) as SignedUserIdJwtPayload | null;

    if (!sessionCookie) {
      await createSession(authUser.uid);
      router.refresh();
      return;
    }

    if (!cookieSession || cookieSession.uid !== authUser.uid) {
      await signOutUser();
      router.refresh();
      return;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (authUser) => {
      if (!authUser) {
        const sessionCookie = await getSession();

        setUserUid(null);
        setUser(null);

        if (sessionCookie) {
          await deleteSession();
          // router.push("/login");
        }

        return;
      }
      await signOutIfInvalidSession(authUser);

      setUserUid(authUser.uid);
      setUser(authUser);
    });
    setLoading(false);
    return () => unsubscribe();
  }, []);

  return { userUid, user, loading };
}
