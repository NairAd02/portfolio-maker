import React from "react";
import LandingReviewsListContainer from "./list/landing-reviews-list-container";

export default function LandingReviewsSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary">
            Lo que dicen nuestros usuarios
          </h2>
          <p className="text-xl text-black font-semibold">
            Miles de profesionales ya confían en PortfolioMaker
          </p>
        </div>
        <LandingReviewsListContainer />
      </div>
    </section>
  );
}
