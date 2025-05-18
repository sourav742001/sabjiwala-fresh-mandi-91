
import React from 'react';
import { ArrowRight } from 'lucide-react';

const CategoriesSection = () => {
  const categories = [
    {
      name: 'Fresh Vegetables',
      image : 'https://cdn11.bigcommerce.com/s-uemzj79jf9/images/stencil/2048x2048/products/1643/3433/vegetables_pic1__24497.1655405427.jpg?c=2',
      count: '25+ Items',
      color: 'bg-green-100',
    },
    {
      name: 'Seasonal Fruits',
      image: 'https://housing.com/news/wp-content/uploads/2022/11/seasonal-vegetables-compressed.jpg',
      count: '20+ Items',
      color: 'bg-orange-100',
    },
    {
      name: 'Daily Combos',
      image: 'https://bf1af2.a-cdn.akinoncloud.com/products/2024/09/11/63767/5d44e516-d2ed-492a-901d-42ad12d501b4_size3840x4690_cropCenter.jpg',
      count: '10+ Items',
      color: 'bg-yellow-100',
    },
    {
      name: 'Exotic Selection',
      image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgecNR2b5UApPVmz7a3UxyKT0fdd9O6WBuoE51PCHhQGufRUfos8TYSehTUrhqryyJi3DWn5lJBXto8t7IAy1ekwW4sH08vZtJ_diRa0mLl5vATHcedkkrjKVaBpT8_tGFzSYr4dl9bHiM/s1523/IMG_20210314_221221_764%257E2_compress80.jpg',
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
