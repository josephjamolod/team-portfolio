import { getDocs, collection, query, where } from "firebase/firestore";

import { firebaseDb } from "@/src/lib/firebase/config/firebase";
import Profile from "@/components/profile-components/Profile";

import { Timestamp } from "firebase/firestore";

export type ProfileData = {
  facebookSrc: string;
  timestamp: string; // Firebase Timestamp type
  userRef: string;
  email: string;
  twitterSrc?: string;
  linkedinSrc?: string;
  serviceDescription: string;
  whatsappNumber?: string;
  skypeInviteSrc?: string;
  profileSrc: string;
  youtubeSrc?: string;
  position: string;
  name: string;
  lastname: string;
  instagramSrc?: string;
  websiteSrc?: string;
  coverSrc: string;
  contactNumber: string;
  tools: string[]; // Array of strings for tool image URLs
};

function convertFirestoreTimestamp(timestamp: Timestamp) {
  return timestamp.toDate().toISOString(); // Convert to an ISO string
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Initialize profile data
  let profileData: ProfileData | null = null;

  try {
    const profilesRef = collection(firebaseDb, "users");
    const q = query(profilesRef, where("userRef", "==", id));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        const data = doc.data();

        // Convert non-plain objects like Firestore.Timestamp
        profileData = {
          ...data,
          timestamp: convertFirestoreTimestamp(data.timestamp), // Convert timestamp
        } as ProfileData;
      });
    } else {
      console.log("No matching document found!");
    }
  } catch (error) {
    console.error("Error fetching document:", error);
  }

  return <Profile profileData={profileData} />;
}
