
import React from 'react';

const Newsletter = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-sabjiwala-green to-sabjiwala-green-dark text-white">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">Subscribe to Our Newsletter</h2>
          <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
            Get updates on new arrivals, seasonal specials, and exclusive discounts right in your inbox.
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="btn-secondary px-6 py-3 sm:whitespace-nowrap"
            >
              Subscribe Now
            </button>
          </form>
          <p className="text-center text-sm mt-4 text-white/80">
            By subscribing, you agree to our Privacy Policy and consent to receive our promotional emails.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
