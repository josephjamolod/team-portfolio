"use client";

import React from "react";
import emailjs from "@emailjs/browser";
import { SelectDemo } from "./select";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { contactModSchema } from "@/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { toast } from "react-toastify";

export default function ContactMod() {
  const form = useForm<z.infer<typeof contactModSchema>>({
    resolver: zodResolver(contactModSchema),
    defaultValues: {
      subject: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: z.infer<typeof contactModSchema>) => {
    try {
      emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
        {
          from_name: data.email,
          to_name: process.env.NEXT_PUBLIC_DEFAULT_NAME,
          from_email: data.email,
          to_email: process.env.NEXT_PUBLIC_DEFAULT_EMAIL,
          message: data.subject + "\n" + data.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );
      toast.success("Message Successfully Sent");
      form.reset();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    /* From Uiverse.io by themrsami */
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-md bg-secondary rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-primary mb-4">Send Message</h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-y-2"
          >
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-primary text-xs">
                      Subject
                    </FormLabel>
                    <FormMessage className="text-xs text-red-500" />
                  </div>
                  <FormControl>
                    <SelectDemo {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-primary text-xs">
                      Email Address
                    </FormLabel>
                    <FormMessage className="text-xs text-red-500" />
                  </div>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Email"
                      className="dark:border-muted-foreground focus-visible:ring-[#9b61d1] "
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-primary text-xs ">
                      Message
                    </FormLabel>
                    <FormMessage className="text-xs text-red-500" />
                  </div>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="resize-none h-44 dark:border-muted-foreground "
                      placeholder="Type your message here. "
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between flex-wrap">
              <p className="text-primary  text-sm">
                Dont have an account or forgot password?
              </p>
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-500 to-[#6434d3] text-white font-bold py-2 px-4 rounded-md pt-1 hover:shadow-lg"
            >
              Send Message
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
}
