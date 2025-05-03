
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
import BlogSection from '@/components/HomePageSections/BlogSection';
import CustomerReviewsGrid from '@/components/HomePageSections/CustomerReviewsGrid';
import TrustBadges from '@/components/HomePageSections/TrustBadges';
import NutritionalInfoSection from '@/components/HomePageSections/NutritionalInfoSection';
import SustainabilitySection from '@/components/HomePageSections/SustainabilitySection';
import PartnershipSection from '@/components/HomePageSections/PartnershipSection';
import FreshProcessSection from '@/components/HomePageSections/FreshProcessSection';
import InstagramFeed from '@/components/HomePageSections/InstagramFeed';
import DeliveryDetailsSection from '@/components/HomePageSections/DeliveryDetailsSection';

const Index = () => {
  console.log("Index component rendering");
  try {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <HeroSection />
          <TrustBadges />
          <PromotionsCarousel />
          <FeaturesSection />
          <SeasonalSection />
          <CategoriesSection />
          <FeaturedProducts />
          <BenefitsSection />
          <HowItWorks />
          <FreshProcessSection />
          <RecipesSection />
          <NutritionalInfoSection />
          <Testimonials />
          <CustomerReviewsGrid />
          <SustainabilitySection />
          <OurFarmers />
          <PartnershipSection />
          <BlogSection />
          <DeliveryDetailsSection />
          <InstagramFeed />
          <DownloadAppSection />
          <Newsletter />
        </main>
        <Footer />
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
