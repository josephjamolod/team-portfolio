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
  isLink,
  uploadImageTools,
  validateInputs,
} from "@/src/lib/firebase/store/users.action";
import UploadTools from "./uploadTools";
import { useEffect, useState } from "react";
import { isValidPhotoUrl } from "@/schema/validators";
import { toast } from "react-toastify";

import ServiceForm, { Service } from "./(service)/serviceForm";
import ServiceList from "./(service)/serviceList";
import { formDefaultVals, renderDataAsDefVal } from "@/contants";
import { CreateProfileFormPropType, PhotoLinks } from "./type";
import FormFieldInput from "./FormFieldInput";
import FormFieldPhoneInput from "./inputNumber";

import { cn } from "@/lib/utils";
import { SmallLoader } from "../smallLoader";
import { CategoryInput } from "./categoryInput";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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
  const [formLoading, setFormLoading] = useState(false);
  const isLoading = updateUserLoader || loading || formLoading;
  const imagesToUpload = images.filter(
    (file) =>
      !(typeof file.preview === "string" && /^(https?:\/\/)/.test(file.preview))
  );
  const oldImagesUploaded = images.filter(
    (file) =>
      typeof file.preview === "string" && /^(https?:\/\/)/.test(file.preview)
  );

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
    if (coverPhoto) {
      form.setValue("coverPhotoUrl", coverPhoto);
      if (form.formState.errors.coverPhotoUrl) {
        form.clearErrors("coverPhotoUrl");
      }
    }
  }, [profilePhoto, coverPhoto, form]);

  const onSubmit = async (data: z.infer<typeof createProfileSchema>) => {
    console.log(data);

    try {
      setFormLoading(true);

      if (!validateInputs({ images, user })) {
        setFormLoading(false);
        return;
      }

      const photo = {
        profile: form.getValues("profilePictureUrl"),
        cover: form.getValues("coverPhotoUrl"),
      };

      let photoLinks: PhotoLinks = {
        profileLink: photo.profile || "",
        coverPhotoLink: photo.cover || "",
      };

      const uploadedProfile = await isLink(photo.profile);
      const uploadedCover = await isLink(photo.cover);
      photoLinks = {
        profileLink: uploadedProfile || photoLinks.profileLink,
        coverPhotoLink: uploadedCover || photoLinks.coverPhotoLink,
      };

      if (
        !(await isValidPhotoUrl(photoLinks.profileLink)) ||
        !(await isValidPhotoUrl(photoLinks.coverPhotoLink))
      ) {
        toast.error("Invalid photo links");
        setFormLoading(false);
        return;
      }

      const oldTools = oldImagesUploaded.map((item) => item.preview);

      const newTools =
        imagesToUpload.length > 0 ? await uploadImageTools(imagesToUpload) : [];

      const toolsToUpload = [...(newTools || []), ...(oldTools || [])];

      if (toolsToUpload.length > 0) {
        await updateUser({
          data,
          photoLinks,
          tools: toolsToUpload as string[], // Pass tools after uploading
          user,
        });
        toast.success(
          `User ${userData ? "updated" : "created"} successfully! `
        );
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Error: ", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <Card className="w-full h-full flex flex-col shadow-none justify-center rounded-l-none rounded-r-md border-none">
      <CardHeader className="md:pt-0"> {children}</CardHeader>
      <CardContent className="pb-0 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-5">
              <h1 className="text-2xl font-bold mb-6 text-primary">
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
              <div className="flex flex-col lg:flex-row gap-y-5 gap-x-5">
                <div className="flex flex-col flex-1">
                  <FormFieldInput
                    optional={false}
                    control={form.control}
                    name="position"
                    type="text"
                    label="Position"
                    placeholder="Your position"
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel className="text-primary text-xs">
                            Category
                          </FormLabel>
                          <FormMessage className="text-xs text-red-500" />
                        </div>
                        <FormControl>
                          <Select
                            value={userData?.category || field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-full bg-[#efecff] focus:border-[#b071ec]   dark:bg-secondary h-[40px]">
                              <SelectValue
                                defaultValue={"red"}
                                placeholder="Select skill category"
                              />
                            </SelectTrigger>
                            <SelectContent className="max-h-60">
                              <SelectGroup {...field}>
                                <CategoryInput />
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="bg-[#efecff]  dark:bg-secondary rounded-lg p-4 mb-4">
                {/* About Yourseld text area */}
                <FormField
                  control={form.control}
                  name="serviceDescription"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel className=" flex gap-x-2 text-primary text-xs">
                          <span>About Yourself</span>
                          <span className="text-red-500">*</span>
                        </FormLabel>
                      </div>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Self Description . . ."
                          className={`text-xs  rounded-none resize-none h-32  bg-white dark:bg-black focus:outline-none focus:border-[#b071ec] ${
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
                  <h1 className="text-2xl font-bold mb-6 text-primary">
                    Your services
                  </h1>
                  <ServiceForm onAddService={handleAddService} />
                  {services && services.length != 0 && (
                    <h2 className="text-2xl font-bold mb-6 text-primary">
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
                    <div className="max-h-[30vh] overflow-y-auto pr-2 bg-[#efecff] dark:bg-secondary rounded-lg p-4 mb-4">
                      <ServiceList
                        services={services}
                        onDeleteService={handleDeleteService}
                      />
                    </div>
                  )}
                </div>
              </div>
              <UploadTools images={images} setImages={setImages} />
              <h1 className="text-2xl font-bold mb-6 text-primary">
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
                  "w-full rounded-md h-12 text-xl mt-[20px] text-white transform transition-opacity duration-300",
                  isLoading
                    ? "bg-[#7a6ff1] opacity-80 cursor-not-allowed"
                    : "bg-[#624ced] hover:bg-[#5643d1] hover:shadow-lg"
                )}
              >
                {isLoading ? (
                  <div className="flex justify-center gap-x-3 items-center">
                    <span>
                      {isOldDataPresent
                        ? "Updating your profile"
                        : "Creating your profile"}
                    </span>
                    <SmallLoader />
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
