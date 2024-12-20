export const formDefaultVals = {
  name: "",
  lastName: "",
  email: "",
  contactNumber: { countryCode: "PH", number: "" },
  position: "",
  category: "",
  serviceDescription: "",
  facebookUrl: "",
  instagramUrl: "",
  linkedinUrl: "",
  skypeInviteUrl: "",
  twitterUrl: "",
  websiteUrl: "",
  whatsappNumber: { countryCode: "PH", number: "" },
  youtubeUrl: "",
  // services: [],
};

export const renderDataAsDefVal = (
  reset: UseFormReset<z.infer<typeof createProfileSchema>>, // Replace with your schema
  userData: Staff | undefined
) => {
  if (userData) {
    reset({
      name: userData.name ?? "",
      lastName: userData.lastname ?? "",
      email: userData.email ?? "",
      contactNumber: userData.contactNumber ?? {
        countryCode: "PH",
        number: "",
      },
      position: userData.position ?? "",
      category: userData.category ?? "",
      serviceDescription: userData.serviceDescription ?? "",
      facebookUrl: userData.facebookSrc ?? "",
      instagramUrl: userData.instagramSrc ?? "",
      linkedinUrl: userData.linkedinSrc ?? "",
      skypeInviteUrl: userData.skypeInviteSrc ?? "",
      twitterUrl: userData.twitterSrc ?? "",
      websiteUrl: userData.websiteSrc ?? "",
      whatsappNumber: userData.whatsappNumber ?? {
        countryCode: "PH",
        number: "",
      },
      youtubeUrl: userData.youtubeSrc ?? "",
      services: userData.services ?? [],
    });
  }
};

//Our Services

import videoEdit from "@/public/assets/images/videoEdit.jpg";
import assistance from "@/public/assets/images/assistance.jpg";
import webDesign from "@/public/assets/images/webDesign.png";
import leadGen from "@/public/assets/images/leadGen.jpg";
import contWrite from "@/public/assets/images/contWrite.jpg";
import socialMed from "@/public/assets/images/socialMed.jpg";
import { Card } from "@/components/ui/apple-cards-carousel";
import { Staff } from "@/components/searchPerson-components/SearchPerson";
import { UseFormReset } from "react-hook-form";
import { z } from "zod";
import { createProfileSchema } from "@/schema";
import DottedMap from "dotted-map";

export const services: Card[] = [
  {
    title: "Video Editing",
    category:
      "Our skilled editors bring your vision to life with professional video editing services that captivate and engage your audience.",
    src: videoEdit,
  },
  {
    title: "Executive Assistance",
    category:
      "From managing schedules to coordinating tasks, our executive assistants ensure seamless support for your leadership team.",
    src: assistance,
  },
  {
    title: "Web Design",
    category:
      "We create visually appealing and user-friendly websites that enhance your online presence and drive business growth.",
    src: webDesign,
  },
  {
    title: "Lead Generation",
    category:
      "Our lead generation experts help you identify and connect with potential customers, boosting your sales pipeline and revenue.",
    src: leadGen,
  },
  {
    title: "Content Writing",
    category:
      "Our talented writers craft compelling content that resonates with your audience and strengthens your brand message.",
    src: contWrite,
  },
  {
    title: "Social Media Management",
    category:
      "We manage your social media platforms with strategic content and engagement tactics to grow your online community and drive interaction.",
    src: socialMed,
  },
];

//Why Choose Us

export interface whyChooseUsTpye {
  text: string;
  description: string;
}

export const messages: whyChooseUsTpye[] = [
  {
    text: "Expert Team:",
    description:
      "Our team comprises experienced professionals who are passionate about delivering excellence in every project.",
  },
  {
    text: "Customized Solutions:",
    description:
      "We tailor our services to meet your specific requirements, ensuring optimal results and satisfaction.",
  },
  {
    text: "Innovative Approach:",
    description:
      "We leverage the latest tools and technologies to provide cutting-edge solutions that keep you ahead of the competition.",
  },
  {
    text: "Customer-Centric:",
    description:
      "Our clients are at the heart of everything we do. We prioritize your needs and work collaboratively to achieve your goals.",
  },
];

// footer
interface AboutUsTye {
  label: string;
  href: string;
}

interface CompanyType {
  label: string;
  href: string;
}

export const aboutUs: AboutUsTye[] = [
  { label: "Services", href: "#services" },
  { label: "Why Choose Us", href: "#why-choose-us" },
  { label: "Meet The Team", href: "/meet-the-team" },
  { label: "Let's Connect", href: "/connect" },
];

export const company: CompanyType[] = [
  { label: "FAQs", href: "#" },
  { label: "Terms & Condition", href: "#" },
];

export const wrapperFramerProps = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export const framerProps = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

//world map constants

export const dots = [
  {
    start: {
      lat: 64.2008,
      lng: -149.4937,
    }, // Alaska (Fairbanks)
    end: {
      lat: 34.0522,
      lng: -118.2437,
    }, // Los Angeles
  },
  {
    start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
    end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
  },
  {
    start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
    end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
  },
  {
    start: { lat: 51.5074, lng: -0.1278 }, // London
    end: { lat: 28.6139, lng: 77.209 }, // New Delhi
  },
  {
    start: { lat: 28.6139, lng: 77.209 }, // New Delhi
    end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
  },
  {
    start: { lat: 28.6139, lng: 77.209 }, // New Delhi
    end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
  },
];

export const projectPoint = (lat: number, lng: number) => {
  const x = (lng + 180) * (800 / 360);
  const y = (90 - lat) * (400 / 180);
  return { x, y };
};

export const map = new DottedMap({ height: 100, grid: "diagonal" });

export const createCurvedPath = (
  start: { x: number; y: number },
  end: { x: number; y: number }
) => {
  const midX = (start.x + end.x) / 2;
  const midY = Math.min(start.y, end.y) - 50;
  return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
};
