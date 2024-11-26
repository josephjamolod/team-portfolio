import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { firebaseAuth, firebaseStorage } from "../config/firebase";
import { ImageFile } from "@/components/create-profile-components/uploadTools";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { User } from "@/providers/userProvider";
import {
  createSession,
  deleteSession,
  getSession,
  signUserId,
  verifySignUserId,
} from "../config/session";

type SignedUserIdJwtPayload = {
  uid: string;
  iat: number;
  exp: number;
};

export async function fetchUser(): Promise<User | null> {
  return new Promise(async (resolve) => {
    const sessionCookie = await getSession();
    onAuthStateChanged(firebaseAuth, async (firebaseUser) => {
      if (firebaseUser) {
        const signUser = await signUserId(firebaseUser.uid);
        const cookie = sessionCookie ?? signUser;

        const cookieSession = (await verifySignUserId(
          cookie
        )) as SignedUserIdJwtPayload | null;

        if (!sessionCookie) {
          await createSession(firebaseUser.uid);
        }

        if (!cookieSession || cookieSession.uid !== firebaseUser.uid) {
          await signOut(firebaseAuth);
          await deleteSession();
        }
        resolve({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        });
      } else {
        if (sessionCookie) {
          await deleteSession();
        }
        resolve(null);
      }
    });
  });
}

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
