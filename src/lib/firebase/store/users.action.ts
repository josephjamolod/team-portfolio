import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { firebaseDb, firebaseStorage } from "../config/firebase";
import { ImageFile } from "@/components/create-profile-components/uploadTools";

import { toast } from "react-toastify";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import {
  CreateUserProfileProp,
  PhotoType,
} from "@/components/create-profile-components/type";
import { Service } from "@/components/create-profile-components/(service)/serviceForm";
import { User } from "@/providers/userProvider";

export const dataURLToBlob = (dataURL: string): Blob => {
  const byteString = atob(dataURL.split(",")[1]);
  const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
  const byteArray = new Uint8Array(byteString.length);

  for (let i = 0; i < byteString.length; i++) {
    byteArray[i] = byteString.charCodeAt(i);
  }

  return new Blob([byteArray], { type: mimeString });
};

export const uploadImage = async (
  imgFile: string | null
): Promise<string | null> => {
  try {
    const filename = self.crypto.randomUUID();

    if (imgFile) {
      const imageBlob = dataURLToBlob(imgFile); // Convert to Blob
      console.log(imageBlob);
      const storageRef = ref(firebaseStorage, `users/${filename}.jpg`);
      await uploadBytesResumable(storageRef, imageBlob);
      const downloadURL = await getDownloadURL(storageRef);
      // console.log("File available at", downloadURL);
      return downloadURL;
    }

    return "";
  } catch (error) {
    console.error("Error uploading image: ", error);
    return "";
  }
};

export const uploadPhoto = async ({
  profile,
  cover,
}: PhotoType): Promise<
  { coverPhotoLink: string | null; profileLink: string | null } | undefined
> => {
  try {
    if (profile && cover) {
      const profileLink = await uploadImage(profile);
      const coverPhotoLink = await uploadImage(cover);
      console.log("File available at", coverPhotoLink, profileLink);
      if (!profileLink || !coverPhotoLink) {
        toast.error("Something went wrong, try again later");
      }
      return { coverPhotoLink, profileLink };
    }
    console.log("No cover or profile photo uploaded");
  } catch (error) {
    console.error("Error uploading image: ", error);
  }
};

// Function to upload an array of files
export const uploadFiles = async (
  fileArray: ImageFile[]
): Promise<string[]> => {
  const downloadURLs: string[] = [];

  for (const file of fileArray) {
    try {
      const filename = self.crypto.randomUUID(); // Generate unique filename
      const imageBlob = dataURLToBlob(file.croppedImage as string); // Convert base64 to Blob
      const storageRef = ref(firebaseStorage, `tools/${filename}.jpg`); // Storage path
      const uploadTask = await uploadBytesResumable(storageRef, imageBlob);
      const downloadURL = await getDownloadURL(uploadTask.ref);
      downloadURLs.push(downloadURL); // Add URL to result array
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }

  return downloadURLs; // Return all uploaded URLs
};

export const uploadImageTools = async (
  images: ImageFile[] | []
): Promise<string[] | undefined> => {
  try {
    if (images.length !== 0) {
      const toolsLink = await uploadFiles(images);
      console.log("Files here!!!", toolsLink);
      return toolsLink;
    }
    console.log("No tools");
  } catch (error) {
    console.error("Error uploading image: ", error);
    return;
  }
};

export const createUserProfile = async ({
  data,
  user,
  tools,
  photoLinks,
}: CreateUserProfileProp) => {
  if (!user) return;

  const userDocRef = doc(firebaseDb, "users", user.uid);

  const userProfileData = {
    services: data.services,
    profileSrc: photoLinks?.profileLink,
    coverSrc: photoLinks?.coverPhotoLink,
    email: data.email,
    name: data.name,
    lastname: data.lastName,
    contactNumber: data.contactNumber,
    position: data.position,
    serviceDescription: data.serviceDescription,
    facebookSrc: data.facebookUrl,
    youtubeSrc: data.youtubeUrl,
    instagramSrc: data.instagramUrl,
    twitterSrc: data.twitterUrl,
    linkedinSrc: data.linkedinUrl,
    whatsappNumber: data.whatsappNumber,
    skypeInviteSrc: data.skypeInviteUrl,
    websiteSrc: data.websiteUrl,
    userRef: user.uid,
    tools,
    timestamp: serverTimestamp(),
  };
  // Save the document to Firestore
  await setDoc(userDocRef, userProfileData);
};

export const filterServices = (
  services: Service[],
  serviceId: number
): Service[] => services.filter((_, index) => index !== serviceId);

interface ValidateInputsProps {
  images: [] | ImageFile[];
  user: User | null;
}

export const validateInputs = ({
  images,
  user,
}: ValidateInputsProps): boolean => {
  if (!images || images.length === 0) {
    toast.error("Please provide image tools");
    return false;
  }

  if (!user) {
    toast.error("User not authenticated");
    return false;
  }

  return true;
};
