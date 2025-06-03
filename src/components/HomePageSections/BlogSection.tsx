
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    title: "5 Ways to Keep Your Vegetables Fresh Longer",
    excerpt: "Learn simple storage techniques that can extend the life of your fresh vegetables by up to 2 weeks.",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=500&auto=format",
    date: "May 2, 2023",
    category: "Storage Tips"
  },
  {
    title: "The Health Benefits of Seasonal Eating",
    excerpt: "Discover why eating vegetables in season can improve your health and help the environment.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format",
    date: "April 15, 2023",
    category: "Health & Nutrition"
  },
  {
    title: "From Farm to Table: Our Journey",
    excerpt: "Follow the fascinating journey of vegetables from our partner farms to your doorstep.",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=500&auto=format",
    date: "March 28, 2023",
    category: "Behind the Scenes"
  }
];

const BlogSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">From Our Blog</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our collection of articles, tips and stories about fresh produce and sustainable farming
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span className="text-emerald-600">{post.category}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  <Button variant="link" className="p-0 text-emerald-600 hover:text-emerald-700 font-medium">
                    Read More <ArrowRight size={16} className="ml-1" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
