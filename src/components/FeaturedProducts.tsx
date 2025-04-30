
import React from 'react';
import { ArrowRight, Plus, ShoppingCart } from 'lucide-react';

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: 'Fresh Tomatoes',
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      price: 30,
      unit: 'kg',
      discount: 5,
    },
    {
      id: 2,
      name: 'Green Capsicum',
      image: 'https://images.unsplash.com/photo-1493962853295-0fd70327578a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      price: 60,
      unit: 'kg',
      discount: 0,
    },
    {
      id: 3,
      name: 'Red Onions',
      image: 'https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      price: 40,
      unit: 'kg',
      discount: 10,
    },
    {
      id: 4,
      name: 'Green Peas',
      image: 'https://images.unsplash.com/photo-1501286353178-1ec871814838?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      price: 80,
      unit: 'kg',
      discount: 0,
    },
    {
      id: 5,
      name: 'Cauliflower',
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      price: 35,
      unit: 'pc',
      discount: 0,
    },
    {
      id: 6,
      name: 'Fresh Apples',
      image: 'https://images.unsplash.com/photo-1493962853295-0fd70327578a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      price: 120,
      unit: 'kg',
      discount: 15,
    },
    {
      id: 7,
      name: 'Lady Finger',
      image: 'https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      price: 50,
      unit: 'kg',
      discount: 0,
    },
    {
      id: 8,
      name: 'Green Chilli',
      image: 'https://images.unsplash.com/photo-1501286353178-1ec871814838?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      price: 25,
      unit: '250g',
      discount: 0,
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Featured Products</h2>
            <p className="mt-2 text-lg text-gray-600">
              Fresh from the mandi, handpicked for you
            </p>
          </div>
          <button className="mt-4 md:mt-0 flex items-center gap-2 text-sabjiwala-green font-medium">
            View All Products <ArrowRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="card-product group">
              {/* Product Badge */}
              {product.discount > 0 && (
                <div className="absolute top-2 left-2 bg-sabjiwala-orange text-white px-2 py-1 rounded-md text-sm font-medium z-10">
                  {product.discount}% OFF
                </div>
              )}
              
              {/* Product Image */}
              <div className="w-full h-48 overflow-hidden">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {/* Product Details */}
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                
                <div className="mb-3 flex items-center">
                  <span className="text-lg font-bold text-sabjiwala-green">
                    ₹{product.discount ? (product.price - (product.price * product.discount / 100)).toFixed(0) : product.price}/{product.unit}
                  </span>
                  
                  {product.discount > 0 && (
                    <span className="ml-2 text-sm text-gray-400 line-through">
                      ₹{product.price}
                    </span>
                  )}
                </div>
                
                {/* Add to Cart Button */}
                <div className="flex gap-2">
                  <button className="flex-1 py-2 btn-primary flex items-center justify-center gap-2">
                    <ShoppingCart size={18} />
                    Add to Cart
                  </button>
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
