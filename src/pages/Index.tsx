
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import CategoriesSection from '@/components/CategoriesSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import SeasonalSection from '@/components/HomePageSections/SeasonalSection';
import BenefitsSection from '@/components/HomePageSections/BenefitsSection';
import RecipesSection from '@/components/HomePageSections/RecipesSection';
import OurFarmers from '@/components/HomePageSections/OurFarmers';
import DownloadAppSection from '@/components/HomePageSections/DownloadAppSection';
import PromotionsCarousel from '@/components/HomePageSections/PromotionsCarousel';
import TrustBadges from '@/components/HomePageSections/TrustBadges';
import NutritionalInfoSection from '@/components/HomePageSections/NutritionalInfoSection';
import SustainabilitySection from '@/components/HomePageSections/SustainabilitySection';
import DeliveryDetailsSection from '@/components/HomePageSections/DeliveryDetailsSection';
import SabjiWalaAI from '@/components/SabjiWalaAI';
import GoatAnimation from '@/components/GoatAnimation';

const Index = () => {
  console.log("Index component rendering");
  try {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <HeroSection />
          <div className="container mx-auto px-4">
            <GoatAnimation />
          </div>
          <TrustBadges />
          <PromotionsCarousel />
          <FeaturesSection />
          <SeasonalSection />
          <CategoriesSection />
          <FeaturedProducts />
          <BenefitsSection />
          <HowItWorks />
          <RecipesSection />
          <NutritionalInfoSection />
          <Testimonials />
          <SustainabilitySection />
          <OurFarmers />
          <DeliveryDetailsSection />
          <DownloadAppSection />
          <Newsletter />
        </main>
        <Footer />
        <SabjiWalaAI />
      </div>
    );
  } catch (error) {
    console.error("Error in Index component:", error);
    return (
      <div className="p-8 bg-red-50 text-red-800">
        <h2>Error rendering Index page</h2>
        <p>{(error as Error).message}</p>
      </div>
    );
  }
};

export default Index;
