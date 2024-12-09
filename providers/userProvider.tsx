"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { ImageFile } from "@/components/create-profile-components/uploadTools";
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { useRouter } from "next/navigation";
import { useUserSession } from "@/hooks/useUserSession";
import { signOutHandler } from "@/src/lib/firebase/config/auth";

// Define a type for your user, matching the properties provided by Firebase
export type User = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
};

export type UserProviderContextType = {
  user: User | null;
  logOutUser: () => void;
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
  const queryClient = useQueryClient();
  const router = useRouter();
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [coverPhoto, setCoverPhoto] = useState<string | null>(null);
  const [images, setImages] = useState<ImageFile[]>([]);

  const { user, userUid, loading: isLoading } = useUserSession();
  console.log(user);

  const logOutUser = async () => {
    await signOutHandler();
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,

        logOutUser,
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
