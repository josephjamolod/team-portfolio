"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseAuth } from "@/src/lib/firebase/config/firebase";
import { ImageFile } from "@/components/create-profile-components/uploadTools";
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";

// Define a type for your user, matching the properties provided by Firebase
export type User = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
};

export type UserProviderContextType = {
  user: User | null;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<User | null, Error>>;
  logOutUser: () => void;
  isLoading: boolean;
  profilePhoto: null | string;
  setProfilePhoto: Dispatch<SetStateAction<string | null>>;
  coverPhoto: null | string;
  setCoverPhoto: Dispatch<SetStateAction<string | null>>;
  images: ImageFile[] | [];
  setImages: Dispatch<SetStateAction<ImageFile[]>>;
};

async function fetchUser(): Promise<User | null> {
  return new Promise((resolve) => {
    onAuthStateChanged(firebaseAuth, (firebaseUser) => {
      if (firebaseUser) {
        resolve({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        });
      } else {
        resolve(null);
      }
    });
  });
}

// Create the AuthContext object
const AuthContext = createContext<UserProviderContextType | undefined>(
  undefined
);

// Create a provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  // const [user, setUser] = useState<User | null>(null); // State to hold the user object
  // const [isLoading, setIsLoading] = useState(true); // State to track loading status
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [coverPhoto, setCoverPhoto] = useState<string | null>(null);
  const [images, setImages] = useState<ImageFile[]>([]);

  const {
    data: user = null,
    isPending: isUserLoading,
    refetch,
  } = useQuery({
    queryKey: ["current-auth-user"],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 5, // Cache user data for 5 minutes
  });

  const { mutate: logOutUser, isPending: isLoadingSignOutMutation } =
    useMutation({
      mutationFn: async () => {
        await signOut(firebaseAuth);
        router.push("/login");
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["current-auth-user", user?.uid],
        });
      },
    });

  const isLoading = isUserLoading || isLoadingSignOutMutation;

  // if (isLoading) {
  //   return <Loading />; // Or a loading spinner
  // }
  return (
    <AuthContext.Provider
      value={{
        user,
        refetch,
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
