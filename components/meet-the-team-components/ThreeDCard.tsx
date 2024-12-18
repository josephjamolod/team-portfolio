"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";

import { FiMail } from "react-icons/fi";
import { ActionButton } from "../searchPerson-components/Sidebar/ActionButton";
import { ViewServices } from "./ViewServices";

import { useAuth } from "@/providers/userProvider";
import { Button } from "../ui/button";
import { framerProps, wrapperFramerProps } from "@/contants";
import { SmallLoader } from "../smallLoader";

export function ThreeDCard() {
  const { staffs, fetchAnotherStaff, showMore, staffsLoading } = useAuth();

  return staffs?.usersData.length === 0 ? (
    <h1 className="pt-10 text-3xl">Team members coming soon!</h1>
  ) : (
    <>
      <motion.div
        variants={wrapperFramerProps}
        initial="hidden"
        animate="show"
        className="h-full w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  justify-center md:px-10 3xl:px-32 pb-4"
      >
        {staffs?.usersData.map((staff) => {
          return (
            <motion.div variants={framerProps} key={staff.id}>
              <CardContainer className="inter-var w-full">
                <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-secondary dark:border-white/[0.2] border-black/[0.1] w-full sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                  <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-neutral-600 dark:text-white capitalize"
                  >
                    {staff.name} {staff.lastname}
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                  >
                    {staff.position}
                  </CardItem>
                  <CardItem translateZ="100" className="w-full mt-4 relative">
                    <Image
                      src={staff.coverSrc || ""}
                      height="1000"
                      width="1000"
                      className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl "
                      alt="thumbnail"
                    />
                    <Image
                      src={staff.profileSrc || ""}
                      height="1000"
                      width="1000"
                      className="h-36 w-36 absolute -bottom-16 left-1/2 -translate-x-1/2 object-cover rounded-full group-hover/card:shadow-xl"
                      alt="thumbnail"
                    />
                  </CardItem>
                  <div className="flex justify-between items-center mt-20">
                    <ViewServices staff={staff} />
                    <div>
                      <ActionButton staff={staff}>
                        <Button>
                          <FiMail />
                          Get In Touch
                        </Button>
                      </ActionButton>
                    </div>
                  </div>
                </CardBody>
              </CardContainer>
            </motion.div>
          );
        })}
      </motion.div>

      {showMore && !staffsLoading && (
        <Button
          disabled={staffsLoading}
          type="button"
          onClick={() => fetchAnotherStaff()}
          variant={"default"}
          className="w-fit place-self-center mb-4"
        >
          {!staffsLoading ? "Show More" : <SmallLoader />}
        </Button>
      )}
    </>
  );
}
