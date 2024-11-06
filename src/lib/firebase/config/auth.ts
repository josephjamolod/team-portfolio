import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { firebaseAuth } from "./firebase";
import { FirebaseError } from "firebase/app";

export const loginHandler = async (email: string, password: string) => {
  try {
    const res = await signInWithEmailAndPassword(firebaseAuth, email, password);
    toast.success("Login successful!");
    return res;
  } catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/invalid-credential":
          toast.error("Invalid credentials");
          break;
        case "auth/missing-password":
          toast.error("Invalid credentials");
          break;
        default:
          toast.error("Something went wrong!");
      }
    }
  }
};

export const signOutHandler = async () => {
  const res = await signOut(firebaseAuth);
  return res;
};
