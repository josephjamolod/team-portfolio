import { User } from "@/providers/userProvider";
import { Dispatch, SetStateAction } from "react";
import { ImageFile } from "./uploadTools";
import { createProfileSchema } from "@/schema";
import { z } from "zod";
import { UseMutateFunction } from "@tanstack/react-query";
import { Service } from "./(service)/serviceForm";
import { Staff } from "../searchPerson-components/SearchPerson";

export interface PhotoType {
  profile: string;
  cover: string;
}

export interface CreateProfileFormPropType {
  children: React.ReactNode;
  user: User | null;
  userData: Staff | undefined;
  updateUser: UseMutateFunction<void, Error, CreateUserProfileProp, unknown>;
  loading: boolean;
  updateUserLoader: boolean;
  profilePhoto: string | null;
  coverPhoto: string | null;
  setImages: Dispatch<SetStateAction<ImageFile[]>>;
  images: ImageFile[] | [];
  services: Service[];
  handleAddService: (service: Service) => void;
  handleDeleteService: (serviceId: number) => void;
}

interface PhotoLinks {
  coverPhotoLink: string | null;
  profileLink: string | null;
}

export interface CreateUserProfileProp {
  data: z.infer<typeof createProfileSchema>;
  user: User | null;
  tools: string[] | undefined;
  photoLinks: PhotoLinks | undefined;
}
