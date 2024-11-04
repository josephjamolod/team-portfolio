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
// import { loginHandler } from "@/src/lib/firebase/config/auth";
// import { LoginData } from "@/types/auth-types";
import { useRouter } from "next/navigation";

export function LogInForm({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    // await loginHandler(data.email, data.password);
    // router.push("/create");
    console.log(data);
  };

  return (
    <Card className="w-full shadow-md p-5  md:p-10 h-full flex flex-col justify-center rounded-l-none rounded-r-md">
      <CardHeader> {children}</CardHeader>
      <CardContent className="pb-0 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
              <p className="text-xs text-[#21C15C]">Forgot your password?</p>
            </div>
            <Button
              type="submit"
              className="w-full rounded-full hover:opacity-85   h-8 bg-gradient-to-r from-[#988ce6] to-[#624ced] font-light  mt-[20px] transform transition-opacity duration-300"
              variant={"default"}
              size={"lg"}
            >
              Sign In
            </Button>
            <p className="flex gap-x-1 items-center justify-center text-xs text-muted-foreground w-full pt-2">
              <span>Don&#39;t Have an Account?</span>
              <Link className="text-[#21C15C]" href={"/"}>
                Contact Moderator
              </Link>
            </p>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex flex-col gap-y-3"></CardFooter>
    </Card>
  );
}
