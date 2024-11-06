"use client";

// import { useUserContext } from "@/providers/userProvider";
import { useAuth } from "@/providers/userProvider";
import { redirect } from "next/navigation";
import Loading from "@/app/loading";

const Layout = ({ children }: { children: React.ReactNode }) => {
  // const user = useUserContext();
  const { isLoading, user } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (user && !isLoading) {
    redirect("/create-profile");
  }

  return <>{children}</>;
};

export default Layout;
