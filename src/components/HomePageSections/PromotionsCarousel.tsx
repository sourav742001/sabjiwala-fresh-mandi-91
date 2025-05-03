
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';

const promotions = [
  {
    id: 1,
    title: "New Customer Offer",
    description: "20% off your first order with code WELCOME20",
    background: "bg-gradient-to-r from-emerald-700 to-emerald-500",
    textColor: "text-white",
    buttonVariant: "outline",
    buttonText: "Shop Now",
  },
  {
    id: 2,
    title: "Weekend Special",
    description: "Free delivery on orders above ₹500 this weekend",
    background: "bg-gradient-to-r from-amber-500 to-yellow-300",
    textColor: "text-gray-800",
    buttonVariant: "default",
    buttonText: "View Offers",
  },
  {
    id: 3,
    title: "Seasonal Bundle",
    description: "Get our premium seasonal vegetable bundle at ₹399 only",
    background: "bg-gradient-to-r from-purple-600 to-pink-500",
    textColor: "text-white",
    buttonVariant: "outline",
    buttonText: "Buy Now",
  },
];

const PromotionsCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % promotions.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-6 px-4">
      <div className="container mx-auto">
        <Carousel className="mx-auto">
          <CarouselContent>
            {promotions.map((promo, index) => (
              <CarouselItem key={promo.id}>
                <div 
                  className={`${promo.background} rounded-lg overflow-hidden shadow-md px-6 py-10 md:py-12 w-full`}
                >
                  <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                      <div className={`${promo.textColor} md:w-3/4`}>
                        <h2 className="text-2xl md:text-4xl font-bold mb-2">{promo.title}</h2>
                        <p className="text-lg md:text-xl opacity-90">{promo.description}</p>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <Button 
                          variant={promo.buttonVariant === "outline" ? "outline" : "default"} 
                          className={promo.buttonVariant === "outline" ? 
                            `border-2 border-white text-white hover:bg-white hover:text-${promo.background.split('-').pop()}` : 
                            "bg-white text-gray-800 hover:bg-gray-100"
                          }
                        >
                          {promo.buttonText}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4" />
          <CarouselNext className="-right-4" />
        </Carousel>

        <div className="flex justify-center gap-1 mt-4">
          {promotions.map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all ${
                activeIndex === index ? "w-6 bg-emerald-600" : "w-2 bg-emerald-200"
              }`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromotionsCarousel;
