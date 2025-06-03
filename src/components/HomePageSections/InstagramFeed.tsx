
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const instagramPosts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=500&auto=format",
    likes: 243,
    comments: 18,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?w=500&auto=format",
    likes: 157,
    comments: 12,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1567306226681-6244d071d166?w=500&auto=format",
    likes: 319,
    comments: 24,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1518843875459-f738682238a6?w=500&auto=format",
    likes: 192,
    comments: 15,
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1518977799258-469b8d480355?w=500&auto=format",
    likes: 276,
    comments: 21,
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1518492104633-130d0cc84637?w=500&auto=format",
    likes: 204,
    comments: 16,
  },
];

const InstagramFeed = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Follow Us on Instagram</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            @thesabjiwala • Join our community of fresh food enthusiasts
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post, index) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="relative group overflow-hidden rounded-lg"
            >
              <img 
                src={post.image} 
                alt={`Instagram post ${post.id}`}
                className="w-full h-48 md:h-40 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="text-white flex space-x-4">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {post.likes}
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    {post.comments}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            Follow on Instagram
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
