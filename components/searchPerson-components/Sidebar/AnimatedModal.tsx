"use client";
import React from "react";
import { Modal, ModalTrigger } from "@/components/ui/animate-modal";
import { BsSend } from "react-icons/bs";

export default function AnimatedModal() {
  return (
    <div className=" flex items-center justify-center">
      <Modal>
        <ModalTrigger className="bg-black active:opacity-85  dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
          <span className="group-hover/modal-btn:translate-x-40 text-center transition text-sm  duration-500">
            Send Mail
          </span>
          <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 dark:text-black flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
            <BsSend size={20} />
          </div>
        </ModalTrigger>
      </Modal>
    </div>
  );
}
