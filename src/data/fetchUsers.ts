import {
  collection,
  DocumentData,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
} from "firebase/firestore";
import { firebaseDb } from "../lib/firebase/config/firebase";
import { Staff } from "@/components/searchPerson-components/SearchPerson";
import { toast } from "react-toastify";
import { Dispatch, SetStateAction } from "react";

export const ITEMS_PER_PAGE = 6;

export async function getDocCount() {
  const collectionRef = collection(firebaseDb, "users");
  const snapshot = await getCountFromServer(collectionRef);
  return snapshot.data().count;
}

export const fetchUsers = async (
  setShowMore: Dispatch<SetStateAction<boolean>>
) => {
  try {
    const totalDocCount = await getDocCount();
    const usersCollection = collection(firebaseDb, "users");
    const queryConstraints = [
      orderBy("timestamp", "desc"),
      limit(ITEMS_PER_PAGE),
    ];
    const q = query(usersCollection, ...queryConstraints);
    const querySnapshot = await getDocs(q);

    const usersData: Staff[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Staff[];

    const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
    if (usersData.length !== totalDocCount) {
      setShowMore(true);
    }
    return { usersData, lastDoc, totalDocCount };
  } catch (error) {
    toast.error("Failed to fetch staff data.");
    console.error("Error fetching users:", error);
    throw error; // Ensure the error propagates
  }
};

// Function to fetch additional users
export const fetchAnotherUsers = async (
  lastVisible: QueryDocumentSnapshot<DocumentData, DocumentData> // Replace `any` with the exact type for your `QueryDocumentSnapshot`
) => {
  try {
    const usersCollection = collection(firebaseDb, "users");
    const queryConstraints = [
      orderBy("timestamp", "desc"),
      startAfter(lastVisible),
      limit(ITEMS_PER_PAGE),
    ];
    const q = query(usersCollection, ...queryConstraints);
    const querySnapshot = await getDocs(q);

    const usersData: Staff[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Staff[];

    const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

    return { usersData, lastDoc };
  } catch (error) {
    toast.error("Failed to fetch staff data.");
    console.error("Error fetching users:", error);
    throw error; // Ensure the error propagates
  }
};
