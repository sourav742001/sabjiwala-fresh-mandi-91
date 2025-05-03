
import React, { useState, useEffect } from 'react';
import { ArrowRight, Carrot, ShoppingBag, LeafyGreen, Apple } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  console.log("HeroSection rendering");
  
  // Track state safely
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [activeVegetable, setActiveVegetable] = useState<React.ReactNode>(null);
  
  // Multiple rotating hero images
  const heroImages = [
    "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1498936178812-4b2e558d2937?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1439886183900-e79ec0057170?auto=format&fit=crop&w=1000&q=80"
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Rotate through different vegetable icons - initialize with safe default
  useEffect(() => {
    console.log("Setting up vegetable rotation effect");
    try {
      const vegetables = [<Carrot key="carrot" />, <LeafyGreen key="leafy" />, <Apple key="apple" />];
      setActiveVegetable(vegetables[0]);
      
      let index = 0;
      const intervalId = setInterval(() => {
        index = (index + 1) % vegetables.length;
        setActiveVegetable(vegetables[index]);
      }, 3000);
      
      return () => {
        console.log("Clearing vegetable rotation interval");
        clearInterval(intervalId);
      };
    } catch (error) {
      console.error("Error in vegetable rotation effect:", error);
    }
  }, []);

  // Rotate through hero images - updated to change every 3 seconds (3000ms)
  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % heroImages.length);
    }, 3000); // Changed from 500ms to 3000ms (3 seconds)
    
    return () => clearInterval(imageInterval);
  }, []);

  // Track mouse position for custom cursor
  const handleMouseMove = (e: React.MouseEvent) => {
    try {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    } catch (error) {
      console.error("Error tracking cursor position:", error);
    }
  };

  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: "easeOut"
      }
    })
  };

  // Background vegetable items
  const backgroundItems = [
    { icon: <Carrot size={32} />, top: '15%', left: '10%', delay: 0 },
    { icon: <LeafyGreen size={28} />, top: '60%', left: '5%', delay: 0.5 },
    { icon: <ShoppingBag size={40} />, top: '20%', left: '80%', delay: 1 },
    { icon: <Apple size={24} />, top: '70%', left: '85%', delay: 1.5 },
    { icon: <LeafyGreen size={36} />, top: '40%', left: '90%', delay: 2 },
  ];

  console.log("HeroSection about to return JSX");

  try {
    return (
      <section 
        className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-emerald-50 to-white"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Custom vegetable cursor - safe rendering with conditional */}
        {isHovering && activeVegetable && (
          <motion.div 
            className="fixed w-8 h-8 pointer-events-none z-50 text-emerald-600"
            animate={{ 
              x: cursorPosition.x - 16, 
              y: cursorPosition.y - 16, 
              rotate: 25 
            }}
            initial={{ x: cursorPosition.x - 16, y: cursorPosition.y - 16 }}
            transition={{ 
              type: "spring", 
              stiffness: 1000, 
              damping: 50,
              mass: 0.5
            }}
          >
            {activeVegetable}
          </motion.div>
        )}
        
        {/* Floating background vegetables */}
        {backgroundItems.map((item, index) => (
          <motion.div
            key={index}
            className="absolute text-emerald-600/20 pointer-events-none"
            style={{ top: item.top, left: item.left }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 0.7, 
              scale: 1,
              y: [0, -15, 0],
            }}
            transition={{
              delay: item.delay,
              y: { repeat: Infinity, duration: 3 + index, repeatType: "reverse" },
              opacity: { duration: 1 },
              scale: { duration: 0.8 }
            }}
          >
            {item.icon}
          </motion.div>
        ))}

        <div className="container-custom relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-16">
            {/* Hero Content */}
            <motion.div 
              className="flex-1"
              initial="hidden"
              animate="visible"
              viewport={{ once: true }}
            >
              {/* Rest of hero content */}
              {/* ... keep existing code for hero content section */}
              <motion.div 
                className="w-24 h-1.5 bg-emerald-700 mb-8 rounded-full overflow-hidden relative"
                custom={0}
                variants={textVariants}
              >
                <motion.div 
                  className="absolute h-full w-full bg-gradient-to-r from-emerald-500 to-emerald-300"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                />
              </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 leading-tight"
                custom={1}
                variants={textVariants}
              >
                <motion.span 
                  className="block"
                  whileHover={{ 
                    color: "#047857",
                    x: 5,
                    transition: { duration: 0.2 } 
                  }}
                >
                  Fresh Produce,
                </motion.span>
                <motion.span 
                  className="text-emerald-700 font-medium relative inline-block"
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 } 
                  }}
                >
                  Digitized Mandi
                  <motion.span 
                    className="absolute -bottom-1 left-0 w-full h-1 bg-emerald-500 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                  />
                </motion.span> 
              </motion.h1>

              {/* Added Mandi on Wheels text with animation */}
              <motion.h2
                className="mt-4 text-2xl md:text-3xl font-light text-emerald-600 italic"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
              >
                <motion.span
                  initial={{ backgroundSize: "0% 2px" }}
                  animate={{ backgroundSize: "100% 2px" }}
                  transition={{ delay: 1.8, duration: 0.8 }}
                  className="bg-gradient-to-r from-emerald-500 to-emerald-300 bg-no-repeat bg-bottom pb-1"
                >
                  Mandi on Wheels
                </motion.span>
              </motion.h2>

              {/* Remaining text and buttons */}
              <motion.p 
                className="mt-8 text-lg text-gray-600 max-w-lg font-light leading-relaxed"
                custom={2}
                variants={textVariants}
              >
                Experience Jwalapuri Mandi's finest bounty, curated and delivered with the elegance it deserves. Farm-fresh vegetables and fruits, from source to your table.
              </motion.p>

              {/* Call to action buttons */}
              <motion.div 
                className="mt-10 flex flex-col sm:flex-row gap-6"
                custom={3}
                variants={textVariants}
              >
                <Link to="/shop">
                  <motion.button 
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: "#065f46",
                      boxShadow: "0 10px 15px -3px rgba(16, 185, 129, 0.2)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    className="px-8 py-4 bg-emerald-700 text-white flex items-center gap-2 rounded-lg group overflow-hidden relative"
                  >
                    <span className="relative z-10">Explore Mandi</span>
                    <motion.div
                      initial={{ x: -5 }}
                      animate={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.8 }}
                    >
                      <ArrowRight size={18} className="relative z-10" />
                    </motion.div>
                    <motion.div 
                      className="absolute inset-0 bg-emerald-600" 
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                </Link>
                <Link to="/about">
                  <motion.button 
                    whileHover={{ 
                      scale: 1.05,
                      borderColor: "#047857",
                      color: "#047857",
                      boxShadow: "0 4px 6px -1px rgba(16, 185, 129, 0.1)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    className="px-8 py-4 border border-gray-300 text-gray-800 hover:border-emerald-700 hover:text-emerald-800 transition-colors rounded-lg"
                  >
                    Our Philosophy
                  </motion.button>
                </Link>
              </motion.div>

              {/* Stats section */}
              <motion.div 
                className="mt-12 flex items-center gap-12"
                custom={4}
                variants={textVariants}
              >
                {[
                  { label: "Fresh Daily", value: "100%" },
                  { label: "Experience", value: "Luxury" },
                  { label: "Guaranteed", value: "Quality" }
                ].map((stat, index) => (
                  <motion.div 
                    key={index}
                    className="flex flex-col"
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <motion.span 
                      className="font-light text-2xl text-emerald-800"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5 + (index * 0.2), duration: 0.5 }}
                    >
                      {stat.value}
                    </motion.span>
                    <motion.span 
                      className="text-sm text-gray-500 mt-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.8 + (index * 0.2), duration: 0.5 }}
                    >
                      {stat.label}
                    </motion.span>
                    {index < 2 && (
                      <motion.div 
                        className="hidden md:block absolute h-12 w-px bg-gray-200 ml-24"
                        initial={{ height: 0 }}
                        animate={{ height: 48 }}
                        transition={{ delay: 2 + (index * 0.2), duration: 0.5 }}
                      />
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            
            {/* Hero Image - Now with multiple rotating images */}
            <motion.div 
              className="flex-1 relative"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              <motion.div 
                className="absolute -top-10 -left-10 w-32 h-32 border border-emerald-200 rounded-lg"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                whileHover={{ 
                  borderColor: "#10b981",
                  rotate: 5,
                  transition: { duration: 0.3 } 
                }}
              />
              <motion.div 
                className="relative z-10 overflow-hidden rounded-lg shadow-xl"
                whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-emerald-900/30 to-transparent z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                />
                <motion.div className="relative w-full h-[500px] overflow-hidden">
                  {heroImages.map((img, index) => (
                    <motion.img 
                      key={index}
                      src={img} 
                      alt={`Fresh vegetables from mandi ${index + 1}`} 
                      className="absolute top-0 left-0 w-full h-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: currentImageIndex === index ? 1 : 0,
                        scale: currentImageIndex === index ? 1 : 1.1
                      }}
                      transition={{ 
                        opacity: { duration: 0.3 },
                        scale: { duration: 1.5 } 
                      }}
                    />
                  ))}
                </motion.div>
                <motion.div 
                  className="absolute bottom-8 left-8 right-8 text-white z-20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                >
                  <div className="text-sm font-medium text-emerald-100">Featured</div>
                  <div className="text-2xl font-light mt-1">Jwalapuri Mandi Experience</div>
                </motion.div>
              </motion.div>
              <motion.div 
                className="absolute -bottom-10 -right-10 w-32 h-32 border border-emerald-200 rounded-lg"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                whileHover={{ 
                  borderColor: "#10b981",
                  rotate: -5,
                  transition: { duration: 0.3 } 
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error in HeroSection render:", error);
    return (
      <section className="py-24 bg-red-50 text-center">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-red-800">Error rendering hero section</h2>
          <p className="mt-4 text-red-700">{(error as Error).message || "Unknown error"}</p>
        </div>
      </section>
    );
  }
};

export default HeroSection;
