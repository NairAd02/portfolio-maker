"use client";
import ReviewCard from "@/components/review-card/review-card";
import { StandardCarouselProvider } from "@/components/ui/standard-carousel/context/standard-carousel-context";
import StandardCarousel from "@/components/ui/standard-carousel/standard-carousel";
import { Review } from "@/lib/types/reviews";
import React from "react";

interface Props {
  reviews: Review[];
}

export default function LandingReviewsList({ reviews }: Props) {
  return (
    <StandardCarouselProvider>
      <StandardCarousel
        items={reviews}
        dimension="100vw"
        className="pl-4 mr-4"
        itemsStyles="sm:basis-1/2 lg:basis-1/4"
        renderCard={(item) => <ReviewCard review={item} />}
        shouldCenter={(breakpoint: string, cantElements: number) => {
          switch (breakpoint) {
            case "3xl":
              return cantElements < 3;
            case "2xl":
              return cantElements < 3;
            case "xl":
              return cantElements < 3;
            case "lg":
              return cantElements < 3;
            case "md":
              return cantElements < 3;
            default:
              return cantElements < 2;
          }
        }}
      />
    </StandardCarouselProvider>
  );
}
