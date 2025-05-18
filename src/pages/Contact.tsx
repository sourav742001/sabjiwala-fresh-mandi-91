
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const contactInfo = [
  {
    icon: <Phone className="h-6 w-6 text-emerald-600" />,
    title: 'Phone',
    content: '+91 9871574228',
    detail: 'Monday to Friday, 9am to 6pm'
  },
  {
    icon: <Mail className="h-6 w-6 text-emerald-600" />,
    title: 'Email',
    content: 'developermishra18@gmail.com',
    detail: "We'll get back to you within 24 hours"
  },
  {
    icon: <MapPin className="h-6 w-6 text-emerald-600" />,
    title: 'Address',
    content: 'Main Sabji Mandi, Azadpur',
    detail: 'Delhi - 110033, India'
  }
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  // Initialize map
  React.useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYW1pdHNpbmdoMjAyMyIsImEiOiJjbGdlN2RidnAwNzVxM2dxbjVlbGNuazdzIn0.Uz5taxJmHj7I2l5R8SH4iQ';
    
    const map = new mapboxgl.Map({
      container: 'contact-map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [77.1734, 28.7078], // Azadpur, Delhi
      zoom: 13,
    });
    
    // Add marker
    new mapboxgl.Marker({ color: '#10b981' })
      .setLngLat([77.1734, 28.7078])
      .setPopup(new mapboxgl.Popup().setHTML("<h3>The SabjiWala HQ</h3><p>Main Sabji Mandi, Azadpur</p>"))
      .addTo(map);
    
    // Add navigation control
    map.addControl(new mapboxgl.NavigationControl());
      
    // Clean up
    return () => map.remove();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message sent!",
        description: "We'll get back to you soon. Thank you for contacting us.",
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow mt-20">
        {/* Hero Banner */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative bg-emerald-50"
        >
          <div className="container-custom py-20">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <div className="w-16 h-1 bg-emerald-700 mb-6"></div>
                <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
                  Contact <span className="text-emerald-700 font-medium">Us</span>
                </h1>
                <p className="text-lg text-gray-600 mb-8 font-light">
                  Have questions or feedback? We'd love to hear from you!
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Contact Info Cards */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="p-3 bg-emerald-50 rounded-full inline-block mb-4">
                    {info.icon}
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{info.title}</h3>
                  <p className="text-emerald-700 font-medium mb-1">{info.content}</p>
                  <p className="text-gray-500 text-sm">{info.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Map and Contact Form */}
        <section className="py-12 bg-gray-50">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Map */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="h-[500px] rounded-lg overflow-hidden shadow-md border border-gray-200"
              >
                <div id="contact-map" className="w-full h-full" />
              </motion.div>
              
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="bg-white p-8 rounded-lg border border-gray-100 shadow-sm">
                  <h2 className="text-2xl font-medium text-gray-900 mb-6">Send us a message</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="John Doe"
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone (optional)</label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          placeholder="How can we help you?"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Write your message here..."
                        rows={6}
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-emerald-700 hover:bg-emerald-800"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <span className="mr-2">Sending</span>
                          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          Send Message 
                          <Send className="ml-2 h-4 w-4" />
                        </span>
                      )}
                    </Button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-medium text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Find answers to common questions about our services, delivery areas, and more.</p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  q: "What areas do you deliver to?",
                  a: "We currently deliver to all major areas in Delhi NCR. You can check if we deliver to your area by entering your pincode during checkout."
                },
                {
                  q: "How do I track my order?",
                  a: "Once your order is confirmed, you'll receive a tracking link via SMS and email. You can also track your order from your account dashboard."
                },
                {
                  q: "What is your return policy?",
                  a: "If you're not satisfied with the quality of the produce, you can return it within 24 hours of delivery for a full refund or replacement."
                },
                {
                  q: "How do you ensure the freshness of your products?",
                  a: "We source our products directly from farmers, and our quality team inspects all produce before it's packed and shipped to ensure freshness."
                }
              ].map((faq, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="bg-gray-50 rounded-lg p-6"
                >
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
