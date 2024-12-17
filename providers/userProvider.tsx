"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
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
import {
  createUserProfile,
  filterServices,
} from "@/src/lib/firebase/store/users.action";
import { CreateUserProfileProp } from "@/components/create-profile-components/type";
import { Staff } from "@/components/searchPerson-components/SearchPerson";
import { Service } from "@/components/create-profile-components/(service)/serviceForm";
import { fetchAnotherUsers, fetchUsers } from "@/src/data/fetchUsers";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { toast } from "react-toastify";

// Define a type for your user, matching the properties provided by Firebase
export type User = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
};

interface OldDataPropType {
  usersData: Staff[];
  lastDoc: QueryDocumentSnapshot<DocumentData, DocumentData>;
}

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
  isOldDataPresent: boolean | undefined;
  profilePhoto: null | string;
  setProfilePhoto: Dispatch<SetStateAction<string | null>>;
  coverPhoto: null | string;
  setCoverPhoto: Dispatch<SetStateAction<string | null>>;
  images: ImageFile[] | [];
  setImages: Dispatch<SetStateAction<ImageFile[]>>;
  services: Service[];
  handleAddService: (service: Service) => void;
  handleDeleteService: (serviceId: number) => void;
  staffs:
    | {
        usersData: Staff[];
        lastDoc: QueryDocumentSnapshot<DocumentData, DocumentData>;
        totalDocCount: number;
      }
    | undefined;
  fetchAnotherStaff: UseMutateFunction<
    {
      usersData: Staff[];
      lastDoc: QueryDocumentSnapshot<DocumentData, DocumentData>;
    },
    Error,
    void,
    unknown
  >;
  showMore: boolean;
  staffsLoading: boolean;
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
  const [services, setServices] = useState<Service[]>([]);
  const [images, setImages] = useState<ImageFile[]>([]);
  const [showMore, setShowMore] = useState(true);
  const { user, userUid, loading: isLoading } = useUserSession();

  // Reset states when `userUid` changes
  useEffect(() => {
    if (!userUid) {
      setProfilePhoto(null);
      setCoverPhoto(null);
      setServices([]);
      setImages([]);
    }
  }, [userUid]);

  useEffect(() => {
    setShowMore(true);
  }, []);

  const { data: userData, isPending: isUserLoading } = useQuery({
    queryKey: ["current-active-user", userUid],
    queryFn: async () => {
      const data = await currentAuthUserDetails({ id: userUid! });
      setCoverPhoto(data?.coverSrc as string);
      setProfilePhoto(data?.profileSrc as string);
      const newFiles: ImageFile[] = (data?.tools || []).map((tool) => {
        return {
          preview: tool,
        } as ImageFile;
      });
      setImages([...newFiles]);
      setServices(data?.services as Service[]);
      return { ...data } as Staff;
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!userUid,
  });

  // console.log(userData);

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

  const logOutUser = async () => {
    await signOutHandler();
    router.push("/login");
  };

  const handleAddService = (service: Service) => {
    setServices((prev: Service[]) => (prev ? [...prev, service] : [service]));
  };

  const handleDeleteService = (serviceId: number) => {
    setServices((prev) => filterServices(prev, serviceId));
  };

  const { data: staffs, isLoading: fetchLoading } = useQuery({
    queryKey: ["profiles"],
    queryFn: fetchUsers,
    enabled: true,
  });

  const { mutate: fetchAnotherStaff, isPending: isMutating } = useMutation({
    mutationFn: async () => {
      if (!staffs?.lastDoc) {
        throw new Error("No last document to paginate from.");
      }
      const newData = await fetchAnotherUsers(staffs.lastDoc);
      return newData;
    },
    onSuccess: (newData: OldDataPropType) => {
      queryClient.setQueryData(["profiles"], (oldData: OldDataPropType) => {
        const updatedData = {
          ...oldData,
          usersData: [...(oldData?.usersData || []), ...newData.usersData],
          lastDoc: newData.lastDoc, // Update the last document
        };

        if (staffs?.totalDocCount === updatedData.usersData.length) {
          setShowMore(false);
        }
        return updatedData;
      });
    },
    onError: (error) => {
      toast.error("Failed to load more profiles.");
      console.error(error);
    },
  });

  const isOldDataPresent = userData && Object.keys(userData).length > 0;
  const loading = isLoading || isUserLoading;
  const staffsLoading = fetchLoading || isMutating;

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        updateUserMutation,
        isLoadingUpdateMutation,
        logOutUser,
        loading,
        isOldDataPresent,
        profilePhoto,
        setProfilePhoto,
        coverPhoto,
        setCoverPhoto,
        images,
        setImages,
        services,
        handleAddService,
        handleDeleteService,
        staffs,
        fetchAnotherStaff,
        showMore,
        staffsLoading,
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
