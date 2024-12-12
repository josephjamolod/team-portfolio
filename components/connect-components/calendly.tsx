"use client";

import React, { useEffect, useState } from "react";
import { PopupButton } from "react-calendly";

export const Calendly = () => {
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // This runs only on the client
    setRootElement(document.getElementById("root") || document.body);
  }, []);

  if (!rootElement) {
    // Render nothing or a fallback while determining the rootElement
    return null;
  }

  return (
    <div className="border rounded-full bg-[#6434d3] hover:bg-[#5139edb5] text-secondary dark:text-white py-2 px-4 w-fit font-semibold hover:shadow-lg mb-4 transition-colors duration-300">
      <PopupButton
        url="https://calendly.com/josephjam627"
        rootElement={rootElement}
        text="Click here to schedule!"
      />
    </div>
  );
};
