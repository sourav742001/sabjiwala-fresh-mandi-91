
import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Amit Sharma',
      location: 'Delhi',
      quote: 'TheSabjiWala has completely changed how I shop for vegetables. The quality is just like I handpicked it myself from the mandi, but without the hassle.',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      name: 'Priya Singh',
      location: 'Noida',
      quote: 'The freshness is unbeatable! I was skeptical about ordering vegetables online, but the produce is even better than what I could find locally.',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      name: 'Rahul Verma',
      location: 'Gurgaon',
      quote: 'Same day delivery and quality produce at reasonable prices. The family veggie combo packs save me time and money every week.',
      image: 'https://randomuser.me/api/portraits/men/62.jpg',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What Our Customers Say</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it – see what our happy customers have to say
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-sabjiwala-gray p-8 rounded-lg relative">
              {/* Quote mark */}
              <div className="absolute top-4 right-4 text-6xl text-sabjiwala-green opacity-20 font-serif">"</div>
              
              <p className="italic text-gray-700 mb-6 relative z-10">
                {testimonial.quote}
              </p>
              
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="ml-4">
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
