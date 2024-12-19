import { z } from "zod";
import { isValidPhoneNumber, refinePhoneNumber } from "./validators";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string(),
});

export const serviceSchema = z.object({
  name: z
    .string()
    .min(10, "Service name is required")
    .max(100, "Service name must be less than 100 characters"),
  description: z
    .string()
    .min(20, "Service description is required")
    .max(1000, "Service description must be less than 500 characters"),
  perHour: z.number().positive("Please add rate"),
  isActive: z.boolean(),
});

export const createProfileSchema = z.object({
  profilePictureUrl: z.string().min(3, "Profile Picture is required"),
  coverPhotoUrl: z.string().min(3, "Cover Photo is required"),
  services: z.array(serviceSchema).min(1, "Must contain at least one service"),
  name: z.string().min(2, { message: "Invalid name" }),
  lastName: z.string().min(2, { message: "Invalid last name" }),
  email: z.string().email({ message: "Invalid email address" }),

  contactNumber: z.object({
    countryCode: z.string().length(2, "Invalid country code"), // ISO Alpha-2 code, e.g., "PH"
    number: z
      .string()
      .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  }),

  position: z.string().min(3, "Position is required"),
  category: z.string().min(3, "Please provide a category"),
  serviceDescription: z
    .string()
    .min(20, { message: "Must contain at least 20 characters" })
    .max(1000, { message: "Maximum of 1000 characters allowed" }),

  facebookUrl: z
    .string()
    .optional()
    .refine(
      (value) =>
        !value ||
        /^\b(?:https?:\/\/)?(?:www\.)?[^ "]+\.[a-zA-Z]{2,}\b/.test(value),
      { message: "Invalid URL" }
    ),

  youtubeUrl: z
    .string()
    .optional()
    .refine(
      (value) =>
        !value ||
        /^\b(?:https?:\/\/)?(?:www\.)?[^ "]+\.[a-zA-Z]{2,}\b/.test(value),
      { message: "Invalid URL" }
    ),

  instagramUrl: z
    .string()
    .optional()
    .refine(
      (value) =>
        !value ||
        /^\b(?:https?:\/\/)?(?:www\.)?[^ "]+\.[a-zA-Z]{2,}\b/.test(value),
      { message: "Invalid URL" }
    ),

  twitterUrl: z
    .string()
    .optional()
    .refine(
      (value) =>
        !value ||
        /^\b(?:https?:\/\/)?(?:www\.)?[^ "]+\.[a-zA-Z]{2,}\b/.test(value),
      { message: "Invalid URL" }
    ),

  linkedinUrl: z
    .string()
    .optional()
    .refine(
      (value) =>
        !value ||
        /^\b(?:https?:\/\/)?(?:www\.)?[^ "]+\.[a-zA-Z]{2,}\b/.test(value),
      { message: "Invalid URL" }
    ),

  whatsappNumber: z
    .object({
      countryCode: z.string().length(2, "Invalid country code"),
      number: z
        .string()
        .refine(refinePhoneNumber, { message: "Invalid phone number" }),
    })
    .optional(),

  skypeInviteUrl: z
    .string()
    .optional()
    .refine(
      (value) =>
        !value ||
        /^(?:https?:\/\/)?(?:join\.skype\.com\/invite\/[a-zA-Z0-9_-]+)$/.test(
          value
        ),
      { message: "Invalid URL" }
    ),

  websiteUrl: z
    .string()
    .optional()
    .refine(
      (value) =>
        !value ||
        /^\b(?:https?:\/\/)?(?:www\.)?[^ "]+\.[a-zA-Z]{2,}\b/.test(value),
      { message: "Invalid URL" }
    ),
});

export const sendMailSchema = z.object({
  name: z.string().min(2, "Name is required").max(20, "Name too long"),
  email: z.string().email({ message: "Invalid email address" }),
  message: z
    .string()
    .min(20, "Message too short")
    .max(1000, "Message too long"),
});

export const contactModSchema = z.object({
  subject: z.string().min(3, "Please provide a subject"),
  email: z.string().email({ message: "Invalid email address" }),
  message: z
    .string()
    .min(20, "Message too short")
    .max(1000, "Message too long"),
});
