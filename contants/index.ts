export const formDefaultVals = {
  name: "",
  lastName: "",
  email: "",
  contactNumber: { countryCode: "PH", number: "" },
  position: "",
  serviceDescription: "",
  facebookUrl: "",
  instagramUrl: "",
  linkedinUrl: "",
  skypeInviteUrl: "",
  twitterUrl: "",
  websiteUrl: "",
  whatsappNumber: { countryCode: "PH", number: "" },
  youtubeUrl: "",
};

import videoEdit from "@/public/assets/images/videoEdit.jpg";
import assistance from "@/public/assets/images/assistance.jpg";
import webDesign from "@/public/assets/images/webDesign.png";
import leadGen from "@/public/assets/images/leadGen.jpg";
import contWrite from "@/public/assets/images/contWrite.jpg";
import socialMed from "@/public/assets/images/socialMed.jpg";
import { Card } from "@/components/ui/apple-cards-carousel";

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
