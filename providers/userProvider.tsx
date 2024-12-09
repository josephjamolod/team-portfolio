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
  UseMutateFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { useRouter } from "next/navigation";
import { useUserSession } from "@/hooks/useUserSession";
import {
  currentAuthUserDetails,
  signOutHandler,
} from "@/src/lib/firebase/config/auth";
import { createUserProfile } from "@/src/lib/firebase/store/users.action";
import { CreateUserProfileProp } from "@/components/create-profile-components/type";
import { Staff } from "@/components/searchPerson-components/SearchPerson";
import { Service } from "@/components/create-profile-components/(service)/serviceForm";

// Define a type for your user, matching the properties provided by Firebase
export type User = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
};

export type UserProviderContextType = {
  user: User | null;
  updateUserMutation: UseMutateFunction<
    void,
    Error,
    CreateUserProfileProp,
    unknown
  >;
  userData: Staff | undefined;
  isLoadingUpdateMutation: boolean;
  logOutUser: () => void;
  loading: boolean;
  profilePhoto: null | string;
  setProfilePhoto: Dispatch<SetStateAction<string | null>>;
  coverPhoto: null | string;
  setCoverPhoto: Dispatch<SetStateAction<string | null>>;
  images: ImageFile[] | [];
  setImages: Dispatch<SetStateAction<ImageFile[]>>;
  services: Service[];
  setServices: Dispatch<SetStateAction<Service[]>>;
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
  const [services, setServices] = useState<Service[]>([]);

  const { user, userUid, loading: isLoading } = useUserSession();

  const { data: userData, isPending: isUserLoading } = useQuery({
    queryKey: ["current-active-user", userUid],
    queryFn: async () => {
      const data = await currentAuthUserDetails({ id: userUid! });
      setCoverPhoto(data?.coverSrc as string);
      setProfilePhoto(data?.profileSrc as string);
      // Map tools (string[]) to ImageFile objects with preview
      const newFiles: ImageFile[] = (data?.tools || []).map((tool) => {
        return {
          preview: tool, // Use tool string as preview
        } as ImageFile;
      });

      setImages([...newFiles]); // Correctly update the images
      setServices(data?.services as Service[]);
      return { uid: userUid, ...data } as Staff;
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!userUid,
  });

  const { mutate: updateUserMutation, isPending: isLoadingUpdateMutation } =
    useMutation({
      mutationFn: createUserProfile,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["current-active-user", user?.uid],
        });
        router.push(`/meet-the-team`);
      },
    });

  console.log(userData?.email);

  const logOutUser = async () => {
    await signOutHandler();
    router.push("/login");
  };

  const loading = isLoading || isUserLoading;

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        updateUserMutation,
        isLoadingUpdateMutation,
        logOutUser,
        loading,
        profilePhoto,
        setProfilePhoto,
        coverPhoto,
        setCoverPhoto,
        images,
        setImages,
        services,
        setServices,
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
