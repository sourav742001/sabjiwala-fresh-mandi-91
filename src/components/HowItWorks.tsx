
import React from 'react';
import { Package, Truck, ShoppingCart } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Package className="w-12 h-12 text-sabjiwala-green" />,
      title: 'We Source Fresh',
      description: "Every morning, we select the best produce from Delhi's sabji mandis.",
      number: '01',
    },
    {
      icon: <ShoppingCart className="w-12 h-12 text-sabjiwala-green" />,
      title: 'You Order Online',
      description: 'Browse and order from our wide selection of fresh vegetables and fruits.',
      number: '02',
    },
    {
      icon: <Truck className="w-12 h-12 text-sabjiwala-green" />,
      title: 'Fast Delivery',
      description: 'We deliver your order to your doorstep within the same day.',
      number: '03',
    },
  ];

  return (
    <section className="py-16 bg-sabjiwala-cream">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How It Works</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            From the mandi to your doorstep in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md relative hover-scale">
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-sabjiwala-orange rounded-full flex items-center justify-center text-white font-bold">
                {step.number}
              </div>
              <div className="mb-6">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
