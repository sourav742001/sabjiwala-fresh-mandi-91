
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

const Index = () => {
  console.log("Index component rendering");
  try {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <HeroSection />
          <FeaturesSection />
          <CategoriesSection />
          <FeaturedProducts />
          <HowItWorks />
          <Testimonials />
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
