import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string(),
});

const isValidPhoneNumber = (value: string) => {
  if (value.match(/12345/)) {
    return "Invalid phone number containing '12345'.";
  } else if (value.length < 10) {
    return false; // Invalid if less than 10 digits
  } else {
    return true; // Valid
  }
};

const refinePhoneNumber = (phoneNumber: string) => {
  if (phoneNumber.trim() === "") {
    return true; // Allow empty string
  }
  return isValidPhoneNumber(phoneNumber);
};

export const createProfileSchema = z.object({
  name: z.string().min(2, { message: "Invalid name" }),
  lastName: z.string().min(2, { message: "Invalid last name" }),
  email: z.string().email({ message: "Invalid email address" }),
  contactNumber: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  position: z.string().min(3, "Position is required"),
  serviceDescription: z
    .string()
    .min(20, { message: "must contain atleast 20 characters" })
    .max(1000, { message: "minimum of 1000 characters" }),
  facebookUrl: z
    .string()
    .refine(
      (value) =>
        value === "" ||
        /^\b(?:https?:\/\/)?(?:www\.)?[^ "]+\.[a-zA-Z]{2,}\b/.test(value),
      {
        message: "Invalid URL",
        // specify the field path for error
      }
    )
    .optional(),
  youtubeUrl: z
    .string()
    .refine(
      (value) =>
        value === "" ||
        /^\b(?:https?:\/\/)?(?:www\.)?[^ "]+\.[a-zA-Z]{2,}\b/.test(value),
      {
        message: "Invalid URL",
      }
    )
    .optional(),
  instagramUrl: z
    .string()
    .refine(
      (value) =>
        value === "" ||
        /^\b(?:https?:\/\/)?(?:www\.)?[^ "]+\.[a-zA-Z]{2,}\b/.test(value),
      {
        message: "Invalid URL",
      }
    )
    .optional(),
  twitterUrl: z
    .string()
    .refine(
      (value) =>
        value === "" ||
        /^\b(?:https?:\/\/)?(?:www\.)?[^ "]+\.[a-zA-Z]{2,}\b/.test(value),
      {
        message: "Invalid URL",
      }
    )
    .optional(),
  linkedinUrl: z
    .string()
    .refine(
      (value) =>
        value === "" ||
        /^\b(?:https?:\/\/)?(?:www\.)?[^ "]+\.[a-zA-Z]{2,}\b/.test(value),
      {
        message: "Invalid URL",
      }
    )
    .optional(),
  whatsappNumber: z
    .string()
    .refine(refinePhoneNumber, { message: "Invalid phone number" })
    .optional(),
  skypeInviteUrl: z
    .string()
    .refine(
      (value) =>
        value === "" ||
        /^(?:https?:\/\/)?(?:join\.skype\.com\/invite\/[a-zA-Z0-9_-]+)$/.test(
          value
        ),
      {
        message: "Invalid URL",
      }
    )
    .optional(),
  websiteUrl: z
    .string()
    .refine(
      (value) =>
        value === "" ||
        /^\b(?:https?:\/\/)?(?:www\.)?[^ "]+\.[a-zA-Z]{2,}\b/.test(value),
      {
        message: "Invalid URL",
      }
    )
    .optional(),
});
