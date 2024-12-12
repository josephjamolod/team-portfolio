import Link from "next/link";
import React from "react";
import { CgLinear } from "react-icons/cg";

export default function Logo({ size }: { size: string }) {
  return (
    <Link
      href={"/"}
      className={`font-semibold ${size} flex justify-center items-center`}
    >
      D
      <span className="p-2">
        <CgLinear />
      </span>
      L
      <span className="p-2">
        <CgLinear />
      </span>
      M A J
    </Link>
  );
}
