
import React from 'react';
import { Truck, Clock, Package, Check } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <Package className="w-10 h-10 text-sabjiwala-green" />,
      title: 'Farm Fresh Produce',
      description: 'Sourced daily from local farms and mandis, ensuring maximum freshness.',
    },
    {
      icon: <Truck className="w-10 h-10 text-sabjiwala-green" />,
      title: 'Quick Delivery',
      description: 'Same-day delivery across Delhi, direct from mandi to your home.',
    },
    {
      icon: <Check className="w-10 h-10 text-sabjiwala-green" />,
      title: 'Quality Guaranteed',
      description: 'Every fruit and vegetable is hand-selected by our expert team.',
    },
    {
      icon: <Clock className="w-10 h-10 text-sabjiwala-green" />,
      title: 'Time-Saving',
      description: 'No more haggling or long queues at the mandi. Order online within minutes.',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why Choose TheSabjiWala?</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            We bring the traditional sabji mandi experience online with added convenience and quality assurance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-sabjiwala-cream rounded-lg hover-scale">
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
