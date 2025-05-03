
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, PlayCircle, ChevronRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const articles = [
  {
    id: 1,
    title: "Understanding Organic Certification in India",
    excerpt: "Learn about the various organic certification standards and what they mean for your vegetables.",
    readTime: "4 min read",
    category: "Organic Farming",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=500&auto=format"
  },
  {
    id: 2,
    title: "Seasonal Growing Cycles for Common Indian Vegetables",
    excerpt: "A comprehensive guide to which vegetables are grown during different seasons in India.",
    readTime: "6 min read",
    category: "Seasonal Guide",
    image: "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=500&auto=format"
  },
  {
    id: 3,
    title: "How to Identify Chemical-Free Vegetables",
    excerpt: "Simple tips to help you spot vegetables grown without harmful pesticides and chemicals.",
    readTime: "5 min read",
    category: "Food Safety",
    image: "https://images.unsplash.com/photo-1518843875459-f738682238a6?w=500&auto=format"
  }
];

const videos = [
  {
    id: 1,
    title: "How to Make a Kitchen Garden in Limited Space",
    duration: "8:24",
    thumbnail: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=500&auto=format",
    views: "15K"
  },
  {
    id: 2,
    title: "Traditional vs. Modern Farming Methods",
    duration: "12:08",
    thumbnail: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=500&auto=format",
    views: "8.2K"
  },
  {
    id: 3,
    title: "Nutrition Benefits of Local Vegetables",
    duration: "6:45",
    thumbnail: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format",
    views: "11K"
  }
];

const resources = [
  {
    id: 1,
    title: "Seasonal Vegetable Calendar",
    type: "PDF Guide",
    icon: "📅"
  },
  {
    id: 2,
    title: "Vegetable Nutrition Chart",
    type: "Printable",
    icon: "📊"
  },
  {
    id: 3,
    title: "Home Storage Guide",
    type: "E-Book",
    icon: "📚"
  },
  {
    id: 4,
    title: "Vegetable Washing Tips",
    type: "Checklist",
    icon: "✅"
  }
];

const EducationalContentSection = () => {
  const [activeTab, setActiveTab] = useState("articles");

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-full mb-4">
            <BookOpen size={24} className="text-blue-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Learn About Fresh Produce</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Educational content to help you become more informed about vegetable cultivation,
            nutrition, and sustainable farming practices
          </p>
        </motion.div>

        <div className="mb-10">
          <Tabs defaultValue="articles" className="w-full" onValueChange={setActiveTab}>
            <div className="flex justify-center mb-8">
              <TabsList className="bg-gray-100">
                <TabsTrigger value="articles" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Articles</TabsTrigger>
                <TabsTrigger value="videos" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Videos</TabsTrigger>
                <TabsTrigger value="resources" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Resources</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="articles">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {articles.map((article, index) => (
                  <motion.div 
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-lg overflow-hidden shadow-md"
                  >
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                          {article.category}
                        </span>
                        <span className="text-xs text-gray-500">{article.readTime}</span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{article.excerpt}</p>
                      <Button variant="ghost" className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 flex items-center p-0">
                        Read Article
                        <ChevronRight size={16} className="ml-1" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="videos">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {videos.map((video, index) => (
                  <motion.div 
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-lg overflow-hidden shadow-md"
                  >
                    <div className="relative h-48 overflow-hidden group">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                        <PlayCircle size={48} className="text-white" />
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
                      <div className="flex items-center justify-between">
                        <Button variant="ghost" className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 flex items-center p-0">
                          Watch Video
                          <PlayCircle size={16} className="ml-2" />
                        </Button>
                        <span className="text-xs text-gray-500">{video.views} views</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="resources">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {resources.map((resource, index) => (
                    <motion.div 
                      key={resource.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="border border-gray-200 rounded-lg p-6 hover:border-blue-200 hover:bg-blue-50/30 transition-colors duration-300"
                    >
                      <div className="text-3xl mb-4">{resource.icon}</div>
                      <h3 className="text-lg font-semibold mb-1">{resource.title}</h3>
                      <p className="text-gray-500 text-sm mb-4">{resource.type}</p>
                      <Button variant="outline" className="w-full border-blue-300 text-blue-700 hover:bg-blue-100">
                        <span>Download</span>
                        <ExternalLink size={14} className="ml-2" />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <motion.div 
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Button className="bg-blue-600 hover:bg-blue-700">
            View All {
              activeTab === "articles" ? "Articles" :
              activeTab === "videos" ? "Videos" : "Resources"
            }
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default EducationalContentSection;
