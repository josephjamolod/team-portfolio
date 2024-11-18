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
import { User } from "@/providers/userProvider";
import {
  uploadFiles,
  uploadImage,
} from "@/src/lib/firebase/store/users.action";
import UploadTools, { ImageFile } from "./uploadTools";
import { Dispatch, SetStateAction, useEffect } from "react";
import { isValidPhotoUrl } from "@/schema/validators";
import { toast } from "react-toastify";

interface CreateProfileFormPropType {
  children: React.ReactNode;
  user: User | null;
  profilePhoto: string | null;
  coverPhoto: string | null;
  setImages: Dispatch<SetStateAction<ImageFile[]>>;
  images: ImageFile[] | [];
}

interface PhotoType {
  profile: string;
  cover: string;
}

export default function CreateProfileForm({
  children,
  user,
  profilePhoto,
  coverPhoto,
  images,
  setImages,
}: CreateProfileFormPropType) {
  // console.log(user);

  const form = useForm<z.infer<typeof createProfileSchema>>({
    resolver: zodResolver(createProfileSchema),
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      contactNumber: "",
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

  const uploadPhoto = async ({
    profile,
    cover,
  }: PhotoType): Promise<
    { coverPhotoLink: string | null; profileLink: string | null } | undefined
  > => {
    try {
      if (profile && cover) {
        const profileLink = await uploadImage(profile);
        const coverPhotoLink = await uploadImage(cover);
        console.log("File available at", coverPhotoLink, profileLink);
        if (!profileLink || !coverPhoto) {
          toast.error("Something went wrong, try again later");
        }
        return { coverPhotoLink, profileLink };
      }
      console.log("No cover or profile photo uploaded");
    } catch (error) {
      console.error("Error uploading image: ", error);
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

  useEffect(() => {
    if (profilePhoto) {
      form.setValue("profilePictureUrl", profilePhoto);
      if (form.formState.errors.profilePictureUrl) {
        form.clearErrors("profilePictureUrl");
      }
    }
    if (coverPhoto) {
      form.setValue("coverPhotoUrl", coverPhoto);

      if (form.formState.errors.coverPhotoUrl) {
        form.clearErrors("coverPhotoUrl");
      }
    }
  }, [profilePhoto, coverPhoto]);

  const onSubmit = async (data: z.infer<typeof createProfileSchema>) => {
    // const profileBlob=form.getValues("profilePictureUrl")
    const photo = {
      profile: form.getValues("profilePictureUrl"),
      cover: form.getValues("coverPhotoUrl"),
    };
    const photoLinks = await uploadPhoto({
      profile: photo.profile,
      cover: photo.cover,
    });
    const isValidProfile = await isValidPhotoUrl(photoLinks?.profileLink);
    const isValidCover = await isValidPhotoUrl(photoLinks?.coverPhotoLink);
    if (isValidCover && isValidProfile) {
      console.log(data, photoLinks);
    }
    return "Invalid link for profile or cover photo";
  };

  return (
    <Card className="w-full h-full flex flex-col shadow-none justify-center rounded-l-none rounded-r-md border-none">
      <CardHeader className="md:pt-0"> {children}</CardHeader>
      <CardContent className="pb-0 ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, (errors) => {
              console.error("Validation errors:", errors);
            })}
          >
            <div className="space-y-5">
              <span className="text-sm text-red-500">
                {form.formState.errors.profilePictureUrl?.message ?? ""}
                {form.formState.errors.coverPhotoUrl?.message ?? ""}
              </span>
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
              <div className="flex flex-col lg:flex-row gap-y-5 gap-x-5">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-black text-xs">
                          Email
                        </FormLabel>
                        {form.formState.errors.email && (
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
                          placeholder="Your Email"
                          className="text-xs h-10 rounded-none bg-[#efecff]  focus:outline-none focus:border-[#b071ec]"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {/* <PhoneInput country={'ph'} value={}/> */}
                <FormField
                  control={form.control}
                  name="contactNumber"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-black text-xs">
                          Contact number
                        </FormLabel>
                        {form.formState.errors.contactNumber && (
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
              </div>
              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-black text-xs">
                        Position
                      </FormLabel>
                      {form.formState.errors.position && (
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
                      {form.formState.errors.serviceDescription && (
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
              <UploadTools images={images} setImages={setImages} />
              <div className="flex flex-col lg:flex-row gap-y-5 gap-x-5">
                <FormField
                  control={form.control}
                  name="skypeInviteUrl"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-black text-xs">
                          Skype invite link
                          <span className="text-muted-foreground">
                            {" (optional)"}
                          </span>
                        </FormLabel>

                        {form.formState.errors.skypeInviteUrl && (
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
                <FormField
                  control={form.control}
                  name="whatsappNumber"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-black text-xs">
                          Whatsapp number
                          <span className="text-muted-foreground">
                            {" (optional)"}
                          </span>
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
                          <span className="text-muted-foreground">
                            {" (optional)"}
                          </span>
                        </FormLabel>
                        {form.formState.errors.linkedinUrl && (
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
                          <span className="text-muted-foreground">
                            {" (optional)"}
                          </span>
                        </FormLabel>

                        {form.formState.errors.websiteUrl && (
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
                          <span className="text-muted-foreground">
                            {" (optional)"}
                          </span>
                        </FormLabel>
                        {form.formState.errors.facebookUrl && (
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
                          <span className="text-muted-foreground">
                            {" (optional)"}
                          </span>
                        </FormLabel>

                        {form.formState.errors.instagramUrl && (
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
                          X link | Twitter
                          <span className="text-muted-foreground">
                            {" (optional)"}
                          </span>
                        </FormLabel>
                        {form.formState.errors.twitterUrl && (
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
                          <span className="text-muted-foreground">
                            {" (optional)"}
                          </span>
                        </FormLabel>

                        {form.formState.errors.youtubeUrl && (
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
              {/* <Button
                type="button"
                onClick={uploadPhoto}
                className="w-full rounded-full hover:opacity-85 h-8 bg-gradient-to-r from-[#988ce6] to-[#624ced] font-light mt-[20px] transform transition-opacity duration-300"
              >
                Upload profile and cover
              </Button> */}
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
