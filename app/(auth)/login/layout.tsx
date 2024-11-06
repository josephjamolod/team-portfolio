"use client";

import { useUserContext } from "@/providers/userProvider";
import { redirect } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const user = useUserContext();

  if (user) {
    redirect("/");
  }

  return <>{children}</>;
};

export default Layout;
