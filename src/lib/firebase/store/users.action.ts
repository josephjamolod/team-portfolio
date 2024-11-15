import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { firebaseStorage } from "../config/firebase";

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
  imgFile: string | undefined
): Promise<string | undefined> => {
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
