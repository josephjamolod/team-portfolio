"use client";

import "react-phone-input-2/lib/style.css";

//shadcn components
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
import {
  uploadImageTools,
  uploadPhoto,
  validateInputs,
} from "@/src/lib/firebase/store/users.action";
import UploadTools from "./uploadTools";
import { useEffect } from "react";
import { isValidPhotoUrl } from "@/schema/validators";
import { toast } from "react-toastify";

import ServiceForm, { Service } from "./(service)/serviceForm";
import ServiceList from "./(service)/serviceList";
import { formDefaultVals, renderDataAsDefVal } from "@/contants";
import { CreateProfileFormPropType } from "./type";
import FormFieldInput from "./FormFieldInput";
import { FirebaseError } from "firebase/app";
import FormFieldPhoneInput from "./inputNumber";

import { cn } from "@/lib/utils";

export default function CreateProfileForm({
  children,
  user,
  userData,
  updateUser,
  updateUserLoader,
  loading,
  profilePhoto,
  coverPhoto,
  images,
  setImages,
  services,
  handleAddService,
  handleDeleteService,
  isOldDataPresent,
}: CreateProfileFormPropType) {
  const isLoading = updateUserLoader || loading;

  // console.log(userData);

  const form = useForm<z.infer<typeof createProfileSchema>>({
    resolver: zodResolver(createProfileSchema),
    defaultValues: {
      ...formDefaultVals,
      services: services as Service[],
    },
  });

  // Render the old data (if there is) of the user to the Inputs
  useEffect(() => {
    if (userData) {
      renderDataAsDefVal(form.reset, userData);
    }
  }, [userData, form.reset]);

  useEffect(() => {
    form.setValue("services", services);
    if (services?.length !== 0 && form.formState.errors.services) {
      form.clearErrors("services");
    }
  }, [services, form]);

  useEffect(() => {
    if (profilePhoto) {
      form.setValue("profilePictureUrl", profilePhoto);
      if (form.formState.errors.profilePictureUrl) {
        form.clearErrors("profilePictureUrl");
      }
    }
  }, [profilePhoto, form]);

  useEffect(() => {
    if (coverPhoto) {
      form.setValue("coverPhotoUrl", coverPhoto);
      if (form.formState.errors.coverPhotoUrl) {
        form.clearErrors("coverPhotoUrl");
      }
    }
  }, [coverPhoto, form]);

  const onSubmit = async (data: z.infer<typeof createProfileSchema>) => {
    try {
      // Validate inputs
      if (!validateInputs({ images, user })) return;
      // Prepare photo URLs
      const photo = {
        profile: form.getValues("profilePictureUrl"),
        cover: form.getValues("coverPhotoUrl"),
      };
      // Upload photos
      const photoLinks = await uploadPhoto({
        profile: photo.profile,
        cover: photo.cover,
      });
      // Upload tools
      const tools = await uploadImageTools(images);
      // Validate photo URLs
      const isValidProfile = await isValidPhotoUrl(photoLinks?.profileLink);
      const isValidCover = await isValidPhotoUrl(photoLinks?.coverPhotoLink);
      if (!isValidCover || !isValidProfile) {
        toast.error("Invalid link for profile or cover photo");
        console.log("Invalid photo links");
        return; // Stop execution if photos are invalid
      }
      updateUser({
        data,
        photoLinks,
        tools,
        user,
      });
      toast.success("User created successfully!");
    } catch (error) {
      // Handle Firebase errors specifically
      if (error instanceof FirebaseError) {
        toast.error("Something went wrong creating your profile");
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <Card className="w-full h-full flex flex-col shadow-none justify-center rounded-l-none rounded-r-md border-none">
      <CardHeader className="md:pt-0"> {children}</CardHeader>
      <CardContent className="pb-0 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-5">
              <h1 className="text-2xl font-bold mb-6 text-gray-800">
                Profile Info
              </h1>
              <div className="flex gap-y-2 flex-col">
                <span className="text-sm text-red-500 block">
                  {form.formState.errors.profilePictureUrl?.message
                    ? "Profile is required"
                    : ""}
                </span>
                <span className="text-sm text-red-500 block">
                  {form.formState.errors.coverPhotoUrl?.message
                    ? "Cover is required"
                    : ""}
                </span>
              </div>
              <div className="flex flex-col lg:flex-row gap-y-5 gap-x-5">
                {/* Name input field */}
                <FormFieldInput
                  optional={false}
                  control={form.control}
                  name="name"
                  type="text"
                  label="Name"
                  placeholder="Your Name"
                />
                {/* Last Name input field */}
                <FormFieldInput
                  optional={false}
                  control={form.control}
                  name="lastName"
                  type="text"
                  label="Last Name"
                  placeholder="Your Last Name"
                />
              </div>
              <div className="flex flex-col lg:flex-row gap-y-5 gap-x-5">
                {/* Email input field */}
                <FormFieldInput
                  optional={false}
                  control={form.control}
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="Your Email"
                />
                {/* Contact Number input field */}
                <FormFieldPhoneInput<z.infer<typeof createProfileSchema>>
                  control={form.control}
                  name="contactNumber"
                  label="Contact Number"
                  placeholder="Enter your contact number"
                />
              </div>
              {/* Position input field */}
              <FormFieldInput
                optional={false}
                control={form.control}
                name="position"
                type="text"
                label="Position"
                placeholder="Your position"
              />
              <div className="bg-[#efecff] rounded-lg p-4 mb-4">
                {/* About Yourseld text area */}
                <FormField
                  control={form.control}
                  name="serviceDescription"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel className=" flex gap-x-2 text-black text-xs">
                          <span>About Yourself</span>
                          <span className="text-red-500">*</span>
                        </FormLabel>
                      </div>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Self Description . . ."
                          className={`text-xs  rounded-none resize-none h-32  bg-white focus:outline-none focus:border-[#b071ec] ${
                            form.formState.errors.email && "border-red-500"
                          }`}
                        />
                      </FormControl>
                      {form.formState.errors.serviceDescription && (
                        <span className="flex gap-x-2 text-red-400">
                          <FormMessage className="text-sm font-normal capitalize" />
                        </span>
                      )}
                    </FormItem>
                  )}
                />
              </div>
              {/* Add services input field */}
              <div className="w-full ">
                <div className=" rounded-xl ">
                  <h1 className="text-2xl font-bold mb-6 text-gray-800">
                    Your services
                  </h1>
                  <ServiceForm onAddService={handleAddService} />
                  {services && services.length != 0 && (
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">
                      Services :{" "}
                      <span className="text-[#624ced] font-bold">
                        {" "}
                        {services.length}
                      </span>
                    </h2>
                  )}
                  <span className="text-sm text-red-500 block">
                    {form.formState.errors.services?.message &&
                      "Please provide your service"}
                  </span>
                  {services && services.length != 0 && (
                    <div className="max-h-[30vh] overflow-y-auto pr-2 bg-[#efecff] rounded-lg p-4 mb-4">
                      <ServiceList
                        services={services}
                        onDeleteService={handleDeleteService}
                      />
                    </div>
                  )}
                </div>
              </div>
              <UploadTools images={images} setImages={setImages} />
              <h1 className="text-2xl font-bold mb-6 text-gray-800">
                Social Links
              </h1>
              <div className="flex flex-col lg:flex-row gap-y-5 gap-x-5">
                <FormFieldInput
                  optional={true}
                  control={form.control}
                  name="skypeInviteUrl"
                  type="text"
                  label="Skype invite link"
                  placeholder="Your Skype invite link"
                />
                <FormFieldPhoneInput<z.infer<typeof createProfileSchema>>
                  control={form.control}
                  name="whatsappNumber"
                  label="Whatsapp Number"
                  placeholder="Enter your Whatsapp number"
                  isOptional={true}
                />
              </div>
              <div className="flex flex-col lg:flex-row gap-y-5 gap-x-5">
                <FormFieldInput
                  optional={true}
                  control={form.control}
                  name="linkedinUrl"
                  type="text"
                  label="LinkedIn link"
                  placeholder="Your LinkedIn link"
                />
                <FormFieldInput
                  optional={true}
                  control={form.control}
                  name="websiteUrl"
                  type="text"
                  label="Website link"
                  placeholder="Your Website link"
                />
              </div>
              <div className="flex flex-col lg:flex-row gap-y-5 gap-x-5">
                <FormFieldInput
                  optional={true}
                  control={form.control}
                  name="facebookUrl"
                  type="text"
                  label="Facebook Link"
                  placeholder="Your LinkedIn link"
                />
                <FormFieldInput
                  optional={true}
                  control={form.control}
                  name="instagramUrl"
                  type="text"
                  label="Instagram link"
                  placeholder="Your Instagram link"
                />
              </div>
              <div className="flex flex-col lg:flex-row gap-y-5 gap-x-5">
                <FormFieldInput
                  optional={true}
                  control={form.control}
                  name="twitterUrl"
                  type="text"
                  label="  X link | Twitter"
                  placeholder="Your X link"
                />
                <FormFieldInput
                  optional={true}
                  control={form.control}
                  name="youtubeUrl"
                  type="text"
                  label="Youtube link"
                  placeholder="Your Youtube link"
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className={cn(
                  "w-full rounded-md h-12 text-xl mt-[20px] transform transition-opacity duration-300",
                  isLoading
                    ? "bg-[#7a6ff1] opacity-80 cursor-not-allowed" // Lighter color and disabled styles when loading
                    : "bg-[#624ced] hover:bg-[#5643d1] hover:shadow-lg"
                )}
              >
                {updateUserLoader ? (
                  <div className="flex justify-center gap-x-3 items-center">
                    <span>
                      {isOldDataPresent
                        ? "Updating your profile"
                        : "Creating your profile"}
                    </span>
                    <div className="w-4 h-4 border-4 border-t-[#624ced] border-gray-300 rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <span>
                    {isOldDataPresent ? "Update Profile" : "Create Profile"}
                  </span>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
