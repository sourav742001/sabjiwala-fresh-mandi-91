
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // Here you would typically handle the submission to your backend
    console.log('Submitted email:', email);
    
    // Show success message
    toast({
      title: "Thanks for subscribing!",
      description: "We'll notify you when we launch.",
    });
    
    // Reset form
    setEmail('');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-emerald-800 rounded-lg p-8"
    >
      <h3 className="text-2xl font-light mb-4">Stay Updated</h3>
      <p className="text-emerald-100 mb-6">
        Enter your email to receive updates about our launch and exclusive offers.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Input
            type="email"
            placeholder="Your email address"
            className="bg-emerald-900/50 border-emerald-600 text-white placeholder:text-emerald-300 h-12"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <Button 
          type="submit" 
          className="bg-white text-emerald-800 hover:bg-gray-100 w-full h-12"
        >
          Notify Me When You Launch
        </Button>
      </form>
      
      <p className="text-xs text-emerald-300 mt-4">
        By subscribing, you agree to our privacy policy and consent to receive updates from TheSabjiWala.
      </p>
    </motion.div>
  );
};

export default NewsletterForm;
