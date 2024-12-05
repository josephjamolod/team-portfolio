"use client";

import Link from "next/link";

//shadcn components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

//shadcn cards and fonts
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

//zod
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { loginSchema } from "@/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { loginHandler } from "@/src/lib/firebase/config/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function LogInForm({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    const response = await loginHandler(data.email, data.password);

    if (response) {
      router.push("/create-profile");
    }

    // toast.success("Log in successfully");
  };

  const { mutate: login, isPending } = useMutation({
    mutationFn: onSubmit,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["current-auth-user"],
      });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return (
    <Card className="w-full shadow-md p-5  md:p-10 h-full flex flex-col justify-center rounded-l-none rounded-r-md">
      <CardHeader> {children}</CardHeader>
      <CardContent className="pb-0 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => login(data))}>
            <div className="space-y-2 ">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-black text-xs">
                        Email Address
                      </FormLabel>
                      <FormMessage className="text-xs" />
                    </div>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Email"
                        className="text-xs h-10 bg-[#efecff] rounded-xl focus:outline-none focus:border-[#b071ec]"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-black text-xs">
                        Password
                      </FormLabel>
                      <FormMessage className="text-xs" />
                    </div>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Password"
                        className="text-xs h-10 bg-[#efecff] rounded-xl focus:outline-none focus:border-[#b071ec]"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-between pt-2">
              <div className="flex gap-x-2 text-xs items-center">
                <input type="checkbox" />
                <span>Remember Password</span>
              </div>
              <p className="text-xs text-[#624ced]">Forgot your password?</p>
            </div>
            <Button
              type="submit"
              className="w-full rounded-full hover:opacity-85   h-8 bg-gradient-to-r from-[#988ce6] to-[#624ced] font-light  mt-[20px] transform transition-opacity duration-300"
              variant={"default"}
              size={"lg"}
              disabled={isPending}
            >
              {isPending ? (
                <div className="flex justify-center gap-x-3 items-center">
                  <span>Signing In</span>
                  <div className="w-4 h-4 border-4 border-t-[#624ced] border-gray-300 rounded-full animate-spin"></div>
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p className="flex gap-x-1 items-center justify-center text-xs text-muted-foreground w-full pt-2">
          <span>Don&#39;t Have an Account?</span>
          <Link className="text-[#624ced]" href={"/"}>
            Contact Moderator
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
