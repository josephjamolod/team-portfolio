import React from "react";

import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { services } from "@/contants";

export default function Services() {
  const cards = services.map((card, index) => (
    <Card key={index} card={card} index={index} />
  ));

  return (
    <div
      id="services"
      className="flex flex-col justify-center pt-5  px-10 md:px-20 3xl:px-60 "
    >
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight ">
        Our Services
      </h1>
      <Carousel items={cards} />
    </div>
  );
}
