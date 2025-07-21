import LandingHeroSection from "./components/landing-hero-section/landing-hero-section";
import LandingFeaturesSection from "./components/landing-features-section/landing-features-section";
import LandingDemostrationSection from "./components/landing-demonstration-section/landing-demonstration-section";
import LandingReviewsSection from "./components/landing-reviews-section/landing-reviews-section";
import LandingPlansSection from "./components/landing-plans-section/landing-plans-section";
import LandingFaqSection from "./components/landing-faq-section/landing-faq-section";
import LandingCtaSection from "./components/landing-cta-section/landing-cta-section";

export default function LandingContainer() {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <LandingHeroSection />
      {/* Features */}
      <LandingFeaturesSection />
      {/* Demostration */}
      <LandingDemostrationSection />
      {/* Reviews */}
      <LandingReviewsSection />
      {/* Plans and Prices */}
      <LandingPlansSection />
      {/* FAQ */}
      <LandingFaqSection />
      {/* CTA Final */}
      <LandingCtaSection />
    </div>
  );
}
