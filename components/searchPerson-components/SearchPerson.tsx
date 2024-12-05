"use client";

import React, { useState, useMemo, useEffect } from "react";

import { collection, getDocs } from "firebase/firestore";
import { firebaseDb } from "@/src/lib/firebase/config/firebase";
import { Services } from "@/app/(public)/meet-the-team/[id]/page";
import { Sidebar } from "./Sidebar/Sidebar";
import { SearchBar } from "./SearchBar";
import { StaffCard } from "./DeveloperCard";

export interface Staff {
  id: string;
  facebookSrc: string;
  timestamp: string; // Firebase Timestamp type
  userRef: string;
  email: string;
  twitterSrc: string;
  linkedinSrc: string;
  serviceDescription: string;
  whatsappNumber: string;
  skypeInviteSrc: string;
  profileSrc: string;
  youtubeSrc: string;
  position: string;
  name: string;
  lastname: string;
  instagramSrc: string;
  websiteSrc: string;
  coverSrc: string;
  contactNumber: { countryCode: string; number: string };
  tools: string[]; // Array of strings for tool image URLs
  services: Services[];
}

function SearchPerson() {
  const [users, setUsers] = useState<Staff[]>([]);
  const [selectedUser, setSelectedUser] = useState<Staff | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fetch users from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(firebaseDb, "users");
        const querySnapshot = await getDocs(usersCollection);

        const usersData: Staff[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Staff[];

        setUsers(usersData);
        if (usersData.length > 0) {
          setSelectedUser(usersData[0]); // Set the first user as selected by default
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on search query
  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-gray-50  overflow-hidden">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden "
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:sticky top-0 h-screen z-30 lg:z-0 transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {selectedUser && (
          <Sidebar
            staff={selectedUser}
            onClose={() => setIsSidebarOpen(false)}
          />
        )}
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8 ">
        <div className=" mx-auto pt-16">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
              DOLOMAJ&prime;S STAFF
            </h1>
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>

          <nav className="mb-8 overflow-x-auto">
            <ul className="flex space-x-8 min-w-max">
              <li>
                <a href="#" className="text-[#624ced] font-medium">
                  All
                </a>
              </li>
            </ul>
          </nav>

          <SearchBar value={searchQuery} onChange={setSearchQuery} />

          {filteredUsers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No staff found matching &#8243;{searchQuery}&#8243;
              </p>
            </div>
          ) : (
            <div className="space-y-4 lg:space-y-6 grid grid-cols-1 border border-none rounded-lg bg-gray-200 max-h-[600px] overflow-hidden overflow-y-auto p-4">
              {filteredUsers.map((user) => (
                <StaffCard
                  key={user.id}
                  staff={user}
                  isSelected={selectedUser?.id === user.id}
                  onClick={() => {
                    setSelectedUser(user);
                    setIsSidebarOpen(true);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default SearchPerson;
