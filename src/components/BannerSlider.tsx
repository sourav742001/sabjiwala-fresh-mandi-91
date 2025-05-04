
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const bannerImages = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1573246123716-6b1782bfc499?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Fresh organic vegetables and fruits',
    title: 'Farm Fresh Produce',
    description: 'Delivered directly from farms to your doorstep'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Seasonal vegetables arranged beautifully',
    title: 'Seasonal Specials',
    description: 'Enjoy the best of each season at unbeatable prices'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Organic farming practices',
    title: 'Sustainably Sourced',
    description: 'Supporting local farmers and sustainable agriculture'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Fresh strawberries and fruits',
    title: 'Premium Fruits',
    description: 'Juicy, flavorful fruits for your healthy lifestyle'
  }
];

const BannerSlider = () => {
  return (
    <section className="relative overflow-hidden bg-white">
      <Carousel className="w-full" opts={{ loop: true }}>
        <CarouselContent>
          {bannerImages.map((image) => (
            <CarouselItem key={image.id} className="relative">
              <div className="relative h-[500px] md:h-[600px] w-full overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center" 
                  style={{ backgroundImage: `url(${image.url})` }}
                >
                  <div className="absolute inset-0 bg-black/40" />
                </div>
                
                <div className="absolute inset-0 flex items-center">
                  <div className="container mx-auto px-4">
                    <div className="max-w-2xl">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-left"
                      >
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">{image.title}</h2>
                        <p className="text-xl md:text-2xl text-white/90 mb-8">{image.description}</p>
                        <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-md">
                          Shop Now
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          <CarouselPrevious className="relative -left-0 h-10 w-10 rounded-full border-2 border-white/70 bg-black/30 text-white hover:bg-black/50" />
          <CarouselNext className="relative -right-0 h-10 w-10 rounded-full border-2 border-white/70 bg-black/30 text-white hover:bg-black/50" />
        </div>
      </Carousel>
    </section>
  );
};

export default BannerSlider;
