import { MainTitle } from "@/components/meet-the-team-components/MainTitle";
import { ThreeDCard } from "@/components/meet-the-team-components/ThreeDCard";
import { Staff } from "@/components/searchPerson-components/SearchPerson";
import { firebaseDb } from "@/src/lib/firebase/config/firebase";
import { collection, getDocs } from "firebase/firestore";
import React from "react";

export default async function MeetTheTeam() {
  let profileData: Staff[] = [];

  try {
    const usersCollection = collection(firebaseDb, "users");
    const querySnapshot = await getDocs(usersCollection);

    profileData = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        timestamp: data.timestamp?.toMillis() || null, // Convert to plain number
      } as Staff;
    });
  } catch (error) {
    console.error("Error fetching users:", error);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center  pt-20">
      <MainTitle />
      <div className="h-full w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  justify-center md:px-10 3xl:px-32">
        {profileData.length > 0 ? (
          profileData.map((staff) => (
            <ThreeDCard key={staff.id} staff={staff} />
          ))
        ) : (
          <div className="text-white">No profile data available</div>
        )}
      </div>
    </div>
  );
}
