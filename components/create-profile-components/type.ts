import { User } from "@/providers/userProvider";
import { Dispatch, SetStateAction } from "react";
import { ImageFile } from "./uploadTools";
import { createProfileSchema } from "@/schema";
import { z } from "zod";

export interface PhotoType {
  profile: string;
  cover: string;
}

export interface CreateProfileFormPropType {
  children: React.ReactNode;
  user: User | null;
  profilePhoto: string | null;
  coverPhoto: string | null;
  setImages: Dispatch<SetStateAction<ImageFile[]>>;
  images: ImageFile[] | [];
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
