"use client";

import { FaExclamationCircle } from "react-icons/fa";

//shadcn components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

//shadcn cards and fonts
import { Card, CardContent, CardHeader } from "@/components/ui/card";

//zod
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createProfileSchema } from "@/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "../ui/textarea";
import { useAuth } from "@/providers/userProvider";
import { uploadImage } from "@/src/lib/firebase/store/users.action";

export default function CreateProfileForm({
  children,
}: {
  children: React.ReactNode;
}) {
  const { imgFile, coverImgFile } = useAuth();
  // console.log(imgFile);

  const form = useForm<z.infer<typeof createProfileSchema>>({
    resolver: zodResolver(createProfileSchema),
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      position: "",
      serviceDescription: "",
      facebookUrl: "",
      instagramUrl: "",
      linkedinUrl: "",
      skypeInviteUrl: "",
      twitterUrl: "",
      websiteUrl: "",
      whatsappNumber: "",
      youtubeUrl: "",
    },
  });

  const uploadPhoto = async (): Promise<string | undefined> => {
    try {
      const profileLink = await uploadImage(imgFile);
      const coverPhotoLink = await uploadImage(coverImgFile);
      console.log("File available at", coverPhotoLink, profileLink);
      return "";
    } catch (error) {
      console.error("Error uploading image: ", error);
      return "";
    }
  };

  const onSubmit = async (data: z.infer<typeof createProfileSchema>) => {
    console.log("Form submitted!");
    console.log(data);
  };

  return (
    <Card className="w-full shadow-md p-5  md:p-10 h-full flex flex-col justify-center rounded-l-none rounded-r-md">
      <CardHeader> {children}</CardHeader>
      <CardContent className="pb-0 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-5">
              <div className="flex flex-col lg:flex-row gap-y-5 gap-x-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-black text-xs">
                          Name
                        </FormLabel>
                        {form.formState.errors.name && (
                          <span className="flex gap-x-2 text-red-400">
                            <FaExclamationCircle />
                            <FormMessage className="text-xs" />
                          </span>
                        )}
                      </div>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Your Name"
                          className="text-xs h-10 rounded-none bg-[#efecff]  focus:outline-none focus:border-[#b071ec]"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-black text-xs">
                          Last Name
                        </FormLabel>

                        {form.formState.errors.name && (
                          <span className="flex gap-x-2 text-red-400">
                            <FaExclamationCircle />
                            <FormMessage className="text-xs" />
                          </span>
                        )}
                      </div>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Your Last Name"
                          className="text-xs h-10 rounded-none bg-[#efecff]  focus:outline-none focus:border-[#b071ec]"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-black text-xs">
                        Email Address
                      </FormLabel>
                      {form.formState.errors.name && (
                        <span className="flex gap-x-2 text-red-400">
                          <FaExclamationCircle />
                          <FormMessage className="text-xs" />
                        </span>
                      )}
                    </div>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Email"
                        className="text-xs h-10 rounded-none bg-[#efecff]  focus:outline-none focus:border-[#b071ec]"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-black text-xs">
                        Position
                      </FormLabel>
                      {form.formState.errors.name && (
                        <span className="flex gap-x-2 text-red-400">
                          <FaExclamationCircle />
                          <FormMessage className="text-xs" />
                        </span>
                      )}
                    </div>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Your position"
                        className="text-xs h-10 rounded-none bg-[#efecff]  focus:outline-none focus:border-[#b071ec]"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="serviceDescription"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-black text-xs">
                        Bio{" "}
                        <span className="text-muted-foreground">
                          {"(can be your services offer)"}
                        </span>
                      </FormLabel>
                      {form.formState.errors.name && (
                        <span className="flex gap-x-2 text-red-400">
                          <FaExclamationCircle />
                          <FormMessage className="text-xs" />
                        </span>
                      )}
                    </div>
                    <FormControl>
                      {/* <Input
                        {...field}
                        type="text"
                        placeholder="Your Bio"
                        className="text-xs h-10 rounded-none bg-[#efecff]  focus:outline-none focus:border-[#b071ec]"
                      /> */}
                      <Textarea
                        {...field}
                        placeholder="Bio description"
                        className="resize-none h-32 focus:outline-none rounded-none"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full rounded-full hover:opacity-85 h-8 bg-gradient-to-r from-[#988ce6] to-[#624ced] font-light mt-[20px] transform transition-opacity duration-300"
              >
                Sign In
              </Button>
              <Button
                type="button"
                onClick={uploadPhoto}
                className="w-full rounded-full hover:opacity-85 h-8 bg-gradient-to-r from-[#988ce6] to-[#624ced] font-light mt-[20px] transform transition-opacity duration-300"
              >
                Upload
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
