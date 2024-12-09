import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { firebaseAuth, firebaseDb } from "./firebase";
import { FirebaseError } from "firebase/app";
import { createSession, deleteSession } from "./session";
import { doc, getDoc } from "firebase/firestore";
import { Staff } from "@/components/searchPerson-components/SearchPerson";

export const loginHandler = async (email: string, password: string) => {
  try {
    const res = await signInWithEmailAndPassword(firebaseAuth, email, password);
    toast.success("Login successful!");
    const userID = res.user.uid;
    if (userID) {
      await createSession(userID);
    }
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
  await deleteSession();
  return res;
};

export const currentAuthUserDetails = async ({ id }: { id: string }) => {
  try {
    if (!id) {
      console.error("Invalid user ID");
      return;
    }

    const userRef = doc(firebaseDb, "users", id);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      console.log("No such document");
      return;
    }

    return docSnap.data() as Staff;
  } catch (error) {
    if (error instanceof FirebaseError) {
      toast.error(error.message);
      return;
    }
    console.error(error);
    return;
  }
};
