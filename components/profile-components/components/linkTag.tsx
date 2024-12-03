import React from "react";

interface LinkTagProp {
  src: string;
  icon: React.JSX.Element;
}

export default function LinkTag({ src, icon }: LinkTagProp) {
  return (
    <a
      className="scale-100 hover:scale-110 p-2"
      href={src}
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon}
    </a>
  );
}
