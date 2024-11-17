"use client";

import { FaExclamationCircle } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

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
import { useAuth, User } from "@/providers/userProvider";
import {
  uploadFiles,
  uploadImage,
} from "@/src/lib/firebase/store/users.action";
import UploadTools from "./uploadTools";

export default function CreateProfileForm({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User | null;
}) {
  const { profilePhoto, coverPhoto, images } = useAuth();
  // console.log(imgFile);
  console.log(user);

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
      if (profilePhoto && coverPhoto) {
        const profileLink = await uploadImage(profilePhoto);
        const coverPhotoLink = await uploadImage(coverPhoto);
        console.log("File available at", coverPhotoLink, profileLink);
      }
      console.log("No cover or profile photo uploaded");

      return "";
    } catch (error) {
      console.error("Error uploading image: ", error);
      return "";
    }
  };

  const uploadImageTools = async (): Promise<string | undefined> => {
    try {
      if (images.length !== 0) {
        const toolsLink = await uploadFiles(images);
        console.log("Files here!!!", toolsLink);
      }
      console.log("No tools");

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
    <Card className="w-full h-full flex flex-col shadow-none justify-center rounded-l-none rounded-r-md border-none">
      <CardHeader className="md:pt-0"> {children}</CardHeader>
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
                {/* <PhoneInput country={'ph'} value={}/> */}
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
              <UploadTools />
              <div className="flex flex-col lg:flex-row gap-y-5 gap-x-5">
                <FormField
                  control={form.control}
                  name="whatsappNumber"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-black text-xs">
                          Whatsapp number
                        </FormLabel>
                        {form.formState.errors.whatsappNumber && (
                          <span className="flex gap-x-2 text-red-400">
                            <FaExclamationCircle />
                            <FormMessage className="text-xs" />
                          </span>
                        )}
                      </div>
                      <FormControl>
                        <PhoneInput
                          {...field}
                          country={"ph"}
                          containerClass="custom-phone-container"
                          inputStyle={{
                            fontSize: "0.875rem", // text-xs
                            height: "2.5rem", // h-10
                            backgroundColor: "#efecff", // bg-[#efecff]
                            border: "2px solid #e4e8ee", // default border

                            borderRadius: 0,
                            width: "100%", // w-full
                          }}
                          placeholder="Your Whatsapp number"
                          onChange={(value) => field.onChange(value)} // Update form state
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="skypeInviteUrl"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-black text-xs">
                          Skype invite link
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
                          placeholder="Your Skype invite link"
                          className="text-xs h-10 rounded-none bg-[#efecff]  focus:outline-none focus:border-[#b071ec]"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col lg:flex-row gap-y-5 gap-x-5">
                <FormField
                  control={form.control}
                  name="linkedinUrl"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-black text-xs">
                          LinkedIn link
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
                          placeholder="Your LinkedIn link"
                          className="text-xs h-10 rounded-none bg-[#efecff]  focus:outline-none focus:border-[#b071ec]"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="websiteUrl"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <div className="flex items-center justify-between ">
                        <FormLabel className="text-black text-xs">
                          Website link
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
                          placeholder="Your Website link"
                          className="text-xs h-10 rounded-none bg-[#efecff]  focus:outline-none focus:border-[#b071ec]"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col lg:flex-row gap-y-5 gap-x-5">
                <FormField
                  control={form.control}
                  name="facebookUrl"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-black text-xs">
                          Facebook Link
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
                          placeholder="Your Facebook link"
                          className="text-xs h-10 rounded-none bg-[#efecff]  focus:outline-none focus:border-[#b071ec]"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="instagramUrl"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-black text-xs">
                          Instagram link
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
                          placeholder="Your Instagram link"
                          className="text-xs h-10 rounded-none bg-[#efecff]  focus:outline-none focus:border-[#b071ec]"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col lg:flex-row gap-y-5 gap-x-5">
                <FormField
                  control={form.control}
                  name="twitterUrl"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-black text-xs">
                          X link{" "}
                          <span className="text-muted-foreground">
                            {"(Twitter Link)"}
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
                        <Input
                          {...field}
                          type="text"
                          placeholder="Your X link"
                          className="text-xs h-10 rounded-none bg-[#efecff]  focus:outline-none focus:border-[#b071ec]"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="youtubeUrl"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-black text-xs">
                          Youtube link
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
                          placeholder="Your Youtube link"
                          className="text-xs h-10 rounded-none bg-[#efecff]  focus:outline-none focus:border-[#b071ec]"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
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
                Upload profile and cover
              </Button>
              <Button
                type="button"
                onClick={uploadImageTools}
                className="w-full rounded-full hover:opacity-85 h-8 bg-gradient-to-r from-[#988ce6] to-[#624ced] font-light mt-[20px] transform transition-opacity duration-300"
              >
                Upload all tools
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
