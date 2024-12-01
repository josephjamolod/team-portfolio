"use client";

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
import {
  createUserProfile,
  uploadImageTools,
  uploadPhoto,
} from "@/src/lib/firebase/store/users.action";
import UploadTools from "./uploadTools";
import { useEffect, useState } from "react";
import { isValidPhotoUrl } from "@/schema/validators";
import { toast } from "react-toastify";

import { Service } from "./(service)/serviceForm";
import ServiceForm from "./(service)/serviceForm";
import ServiceList from "./(service)/serviceList";
import { formDefaultVals } from "@/contants";
import { CreateProfileFormPropType } from "./type";

export default function CreateProfileForm({
  children,
  user,
  profilePhoto,
  coverPhoto,
  images,
  setImages,
}: CreateProfileFormPropType) {
  const [services, setServices] = useState<Service[]>([]);

  const filterServices = (services: Service[], serviceId: number): Service[] =>
    services.filter((service) => service.id !== serviceId);

  const handleAddService = (service: Service) => {
    setServices((prev) => [...prev, service]);
  };

  const handleDeleteService = (serviceId: number) => {
    setServices((prev) => filterServices(prev, serviceId));
  };

  const form = useForm<z.infer<typeof createProfileSchema>>({
    resolver: zodResolver(createProfileSchema),
    defaultValues: {
      ...formDefaultVals,
      services: services,
    },
  });

  useEffect(() => {
    form.setValue("services", services);
    if (services.length !== 0 && form.formState.errors.services) {
      form.clearErrors("services");
    }

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
  }, [profilePhoto, coverPhoto, form, services]);

  const onSubmit = async (data: z.infer<typeof createProfileSchema>) => {
    try {
      if (user) {
        const photo = {
          profile: form.getValues("profilePictureUrl"),
          cover: form.getValues("coverPhotoUrl"),
        };
        const photoLinks = await uploadPhoto({
          profile: photo.profile,
          cover: photo.cover,
        });
        const tools = await uploadImageTools(images);
        const isValidProfile = await isValidPhotoUrl(photoLinks?.profileLink);
        const isValidCover = await isValidPhotoUrl(photoLinks?.coverPhotoLink);
        if (!isValidCover && !isValidProfile) {
          console.log("Invalid photos link");
          return;
        }
        if (isValidCover && isValidProfile) {
          console.log(data, photoLinks);
          await createUserProfile({ data, photoLinks, tools, user });
          toast.success("User created successfully!");
        }

        return "Invalid link for profile or cover photo";
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="w-full h-full flex flex-col shadow-none justify-center rounded-l-none rounded-r-md border-none">
      <CardHeader className="md:pt-0"> {children}</CardHeader>
      <CardContent className="pb-0 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-5">
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

              <h1 className="text-2xl font-bold mb-6 text-gray-800">
                Profile Info
              </h1>
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
                      </div>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Your Name"
                          className={`text-xs h-10 rounded-none bg-[#efecff]  focus:outline-none focus:border-[#b071ec] ${
                            form.formState.errors.name && "border-red-500"
                          }`}
                        />
                      </FormControl>
                      {form.formState.errors.name && (
                        <span className="flex gap-x-2 text-red-400">
                          <FormMessage className="text-sm font-normal" />
                        </span>
                      )}
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
                      </div>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Your Last Name"
                          className={`text-xs h-10 rounded-none bg-[#efecff]  focus:outline-none focus:border-[#b071ec] ${
                            form.formState.errors.lastName && "border-red-500"
                          }`}
                        />
                      </FormControl>
                      {form.formState.errors.name && (
                        <span className="flex gap-x-2 text-red-400">
                          <FormMessage className="text-sm font-normal" />
                        </span>
                      )}
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
                      </div>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Your Email"
                          className={`text-xs h-10 rounded-none bg-[#efecff]  focus:outline-none focus:border-[#b071ec] ${
                            form.formState.errors.email && "border-red-500"
                          }`}
                        />
                      </FormControl>
                      {form.formState.errors.email && (
                        <span className="flex gap-x-2 text-red-400">
                          <FormMessage className="text-sm font-normal" />
                        </span>
                      )}
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
                            border: form.formState.errors.contactNumber
                              ? "1.5px solid #f87171" // Red border if there's an error
                              : "1.5px solid #e4e8ee", // Default border

                            borderRadius: 0,
                            width: "100%", // w-full
                          }}
                          placeholder="Your Whatsapp number"
                          onChange={(value) => field.onChange(value)} // Update form state
                        />
                      </FormControl>
                      {form.formState.errors.contactNumber && (
                        <span className="flex gap-x-2 text-red-400">
                          <FormMessage className="text-sm font-normal" />
                        </span>
                      )}
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
                    </div>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Your position"
                        className={`text-xs h-10 rounded-none bg-[#efecff]  focus:outline-none focus:border-[#b071ec] ${
                          form.formState.errors.position && "border-red-500"
                        }`}
                      />
                    </FormControl>
                    {form.formState.errors.position && (
                      <span className="flex gap-x-2 text-red-400">
                        <FormMessage className="text-sm font-normal" />
                      </span>
                    )}
                  </FormItem>
                )}
              />
              <div className="bg-[#efecff] rounded-lg p-4 mb-4">
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
                      </div>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Bio description"
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

              <div className="w-full ">
                <div className=" rounded-xl ">
                  <h1 className="text-2xl font-bold mb-6 text-gray-800">
                    Your services
                  </h1>
                  <ServiceForm onAddService={handleAddService} />
                  {services.length != 0 && (
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">
                      Services :{" "}
                      <span className="text-[#624ced] font-bold">
                        {" "}
                        {services.length}
                      </span>
                    </h2>
                  )}
                  <span className="text-sm text-red-500 block">
                    {form.formState.errors.services?.message}
                  </span>
                  {services.length != 0 && (
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
                      </div>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Your Skype invite link"
                          className={`text-xs h-10 rounded-none bg-[#efecff]  focus:outline-none focus:border-[#b071ec] ${
                            form.formState.errors.skypeInviteUrl &&
                            "border-red-500"
                          }`}
                        />
                      </FormControl>
                      {form.formState.errors.skypeInviteUrl && (
                        <span className="flex gap-x-2 text-red-400">
                          <FormMessage className="text-sm font-normal" />
                        </span>
                      )}
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
                            border: form.formState.errors.whatsappNumber
                              ? "1.5px solid #f87171" // Red border if there's an error
                              : "1.5px solid #e4e8ee", // Default border

                            borderRadius: 0,
                            width: "100%", // w-full
                          }}
                          placeholder="Your Whatsapp number"
                          onChange={(value) => field.onChange(value)} // Update form state
                        />
                      </FormControl>
                      {form.formState.errors.whatsappNumber && (
                        <span className="flex gap-x-2 text-red-400">
                          <FormMessage className="text-sm font-normal" />
                        </span>
                      )}
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
                      </div>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Your LinkedIn link"
                          className={`text-xs h-10 rounded-none bg-[#efecff]  focus:outline-none focus:border-[#b071ec] ${
                            form.formState.errors.linkedinUrl &&
                            "border-red-500"
                          }`}
                        />
                      </FormControl>
                      {form.formState.errors.linkedinUrl && (
                        <span className="flex gap-x-2 text-red-400">
                          <FormMessage className="text-sm font-normal" />
                        </span>
                      )}
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
                      </div>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Your Website link"
                          className={`text-xs h-10 rounded-none bg-[#efecff]  focus:outline-none focus:border-[#b071ec] ${
                            form.formState.errors.websiteUrl && "border-red-500"
                          }`}
                        />
                      </FormControl>
                      {form.formState.errors.websiteUrl && (
                        <span className="flex gap-x-2 text-red-400">
                          <FormMessage className="text-sm font-normal" />
                        </span>
                      )}
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
                      </div>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Your Facebook link"
                          className={`text-xs h-10 rounded-none bg-[#efecff]  focus:outline-none focus:border-[#b071ec] ${
                            form.formState.errors.facebookUrl &&
                            "border-red-500"
                          }`}
                        />
                      </FormControl>
                      {form.formState.errors.facebookUrl && (
                        <span className="flex gap-x-2 text-red-400">
                          <FormMessage className="text-sm font-normal" />
                        </span>
                      )}
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
                      </div>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Your Instagram link"
                          className={`text-xs h-10 rounded-none bg-[#efecff]  focus:outline-none focus:border-[#b071ec] ${
                            form.formState.errors.instagramUrl &&
                            "border-red-500"
                          }`}
                        />
                      </FormControl>
                      {form.formState.errors.instagramUrl && (
                        <span className="flex gap-x-2 text-red-400">
                          <FormMessage className="text-sm font-normal" />
                        </span>
                      )}
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
                      </div>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Your X link"
                          className={`text-xs h-10 rounded-none bg-[#efecff]  focus:outline-none focus:border-[#b071ec] ${
                            form.formState.errors.twitterUrl && "border-red-500"
                          }`}
                        />
                      </FormControl>
                      {form.formState.errors.twitterUrl && (
                        <span className="flex gap-x-2 text-red-400">
                          <FormMessage className="text-sm font-normal" />
                        </span>
                      )}
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
                      </div>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Your Youtube link"
                          className={`text-xs h-10 rounded-none bg-[#efecff]  focus:outline-none focus:border-[#b071ec] ${
                            form.formState.errors.youtubeUrl && "border-red-500"
                          }`}
                        />
                      </FormControl>
                      {form.formState.errors.youtubeUrl && (
                        <span className="flex gap-x-2 text-red-400">
                          <FormMessage className="text-sm font-normal" />
                        </span>
                      )}
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                className="w-full rounded-md hover:opacity-100 opacity-85 h-12 text-xl hover:shadow-lg bg-gradient-to-r from-[#988ce6] to-[#624ced] mt-[20px] transform transition-opacity duration-300"
              >
                Create Profile
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
