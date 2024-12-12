import React from "react";
import { SelectDemo } from "./select";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export default function ContactMod() {
  return (
    /* From Uiverse.io by themrsami */
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Send Message</h2>
        <form className="flex flex-col gap-y-2">
          <SelectDemo />
          <Input type="email" placeholder="Email" />
          <Textarea
            className="resize-none h-44"
            placeholder="Type your message here."
          />
          <div className="flex items-center justify-between flex-wrap">
            <p className="text-gray-900  text-sm">
              Dont have an account or forgot password?
            </p>
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 to-[#6434d3] text-white font-bold py-2 px-4 rounded-md pt-1 hover:shadow-lg"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
