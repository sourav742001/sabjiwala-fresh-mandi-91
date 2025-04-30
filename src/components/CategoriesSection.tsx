
import React from 'react';
import { ArrowRight } from 'lucide-react';

const CategoriesSection = () => {
  const categories = [
    {
      name: 'Fresh Vegetables',
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      count: '25+ Items',
      color: 'bg-green-100',
    },
    {
      name: 'Seasonal Fruits',
      image: 'https://images.unsplash.com/photo-1493962853295-0fd70327578a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      count: '20+ Items',
      color: 'bg-orange-100',
    },
    {
      name: 'Daily Combos',
      image: 'https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      count: '10+ Items',
      color: 'bg-yellow-100',
    },
    {
      name: 'Exotic Selection',
      image: 'https://images.unsplash.com/photo-1501286353178-1ec871814838?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      count: '15+ Items',
      color: 'bg-purple-100',
    },
  ];

  return (
    <section className="py-16 bg-sabjiwala-gray">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Featured Categories</h2>
            <p className="mt-2 text-lg text-gray-600">
              Explore our range of fresh vegetables and fruits
            </p>
          </div>
          <button className="mt-4 md:mt-0 flex items-center gap-2 text-sabjiwala-green font-medium">
            View All Categories <ArrowRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div key={index} className="card-product group cursor-pointer">
              <div className={`w-full h-48 overflow-hidden ${category.color}`}>
                <img 
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
