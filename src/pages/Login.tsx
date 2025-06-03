
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Form validation schema
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    // Simulate login (replace with actual authentication later)
    setTimeout(() => {
      console.log("Login values:", values);
      setIsLoading(false);
      
      // Set both localStorage and sessionStorage for persistent login
      localStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('isLoggedInSession', 'true');
      localStorage.setItem('user', JSON.stringify({
        email: values.email,
        name: values.email.split('@')[0]
      }));
      
      toast.success("Successfully logged in!");
      navigate("/shop");
    }, 1500);
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow py-12 md:py-16">
        <div className="container-custom max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-lg shadow-sm border border-gray-100"
          >
            <div className="text-center mb-6">
              <h1 className="text-2xl font-light text-gray-900">Welcome Back</h1>
              <p className="text-sm text-gray-600 mt-2">
                Sign in to your account to continue
              </p>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="your@email.com" 
                          type="email"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="••••••••" 
                          type="password" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="text-right">
                  <Link to="#" className="text-sm text-emerald-700 hover:text-emerald-800">
                    Forgot password?
                  </Link>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-emerald-700 hover:bg-emerald-800" 
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </Form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to="/signup" className="text-emerald-700 hover:text-emerald-800">
                  Sign up
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
