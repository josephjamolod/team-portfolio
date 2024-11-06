import { firebaseAuth } from "@/src/lib/firebase/config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export function useUserContext() {
  const [user] = useAuthState(firebaseAuth);
  if (!user) {
    return null;
  }
  return user;
}
