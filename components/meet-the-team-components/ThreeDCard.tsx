"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { Staff } from "../searchPerson-components/SearchPerson";
import { FiMail } from "react-icons/fi";
import { ActionButton } from "../searchPerson-components/Sidebar/ActionButton";
import { ViewServices } from "./ViewServices";

export function ThreeDCard({ staff }: { staff: Staff }) {
  return (
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
            <ActionButton
              icon={<FiMail />}
              staff={staff}
              label="Get In Touch"
            />
          </div>
        </div>
      </CardBody>
    </CardContainer>
  );
}
