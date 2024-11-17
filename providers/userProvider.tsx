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
import { ImageFile } from "@/components/create-profile-components/uploadTools";

// Define a type for your user, matching the properties provided by Firebase
export type User = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
};

export type UserProviderContextType = {
  user: User | null;
  isLoading: boolean;
  profilePhoto: null | string;
  setProfilePhoto: Dispatch<SetStateAction<string | null>>;
  coverPhoto: null | string;
  setCoverPhoto: Dispatch<SetStateAction<string | null>>;
  images: ImageFile[] | [];
  setImages: Dispatch<SetStateAction<ImageFile[]>>;
};

// Create the AuthContext object
const AuthContext = createContext<UserProviderContextType | undefined>(
  undefined
);

// Create a provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null); // State to hold the user object
  const [isLoading, setIsLoading] = useState(true); // State to track loading status
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [coverPhoto, setCoverPhoto] = useState<string | null>(null);
  const [images, setImages] = useState<ImageFile[]>([]);

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
        profilePhoto,
        setProfilePhoto,
        coverPhoto,
        setCoverPhoto,
        images,
        setImages,
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
