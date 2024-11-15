"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { firebaseAuth } from "@/src/lib/firebase/config/firebase";

// Define a type for your user, matching the properties provided by Firebase
type User = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
};

export type UserProviderContextType = {
  user: User | null;
  isLoading: boolean;
  imgFile: undefined | string;
  setImgFile: Dispatch<SetStateAction<string | undefined>>;
  coverImgFile: undefined | string;
  setCoverImgFile: Dispatch<SetStateAction<string | undefined>>;
};

// Create the AuthContext object
const AuthContext = createContext<UserProviderContextType | undefined>(
  undefined
);

// Create a provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null); // State to hold the user object
  const [isLoading, setIsLoading] = useState(true); // State to track loading status
  const [imgFile, setImgFile] = useState<undefined | string>();
  const [coverImgFile, setCoverImgFile] = useState<undefined | string>();

  // Check for user's authentication status on mount
  useEffect(() => {
    // This function from Firebase gets called whenever the auth state changes
    const unsubscribe = onAuthStateChanged(
      firebaseAuth,
      (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser) {
          // Map the FirebaseUser object to your custom User type
          const user: User = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
          };
          setUser(user);
        } else {
          setUser(null);
        }
        setIsLoading(false);
      }
    );

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        imgFile,
        setImgFile,
        coverImgFile,
        setCoverImgFile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the AuthContext
export function useAuth() {
  const user = useContext(AuthContext);
  if (!user) {
    throw new Error(
      "useUserContext must be used within an UserContextProvider"
    );
  }
  return user;
}
