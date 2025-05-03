
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { 
  BrowserRouter, 
  Routes, 
  Route
} from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Shop from "./pages/Shop";
import VegetableDetails from "./pages/VegetableDetails";
import Cart from "./pages/Cart";
import Categories from "./pages/Categories";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import OrderConfirmation from "./pages/OrderConfirmation";
import TrackOrder from "./pages/TrackOrder";
import Orders from "./pages/Orders";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import ShippingPolicy from "./pages/ShippingPolicy";
import Returns from "./pages/Returns";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Recipes from "./pages/Recipes";
import ViewRecipe from "./pages/ViewRecipe";
import React from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import SeasonalItems from "./pages/SeasonalItems";
import Coupons from "./pages/Coupons";
import MapTracking from "./pages/MapTracking";

// Create a simple error boundary component
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: Error | null}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 bg-red-50 text-red-800 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          <p className="mb-4">{this.state.error?.message || 'Unknown error'}</p>
          <button 
            onClick={() => this.setState({ hasError: false })}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const queryClient = new QueryClient();

console.log("App rendering, about to create providers");

const App = () => {
  console.log("Inside App component");
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <BrowserRouter>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={
                  <ErrorBoundary>
                    <Index />
                  </ErrorBoundary>
                } />
                <Route path="/shop" element={<Shop />} />
                <Route path="/vegetable/:id" element={<VegetableDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/about" element={<About />} />
                
                {/* Authentication routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                
                {/* Recipe routes */}
                <Route path="/recipes" element={<Recipes />} />
                <Route path="/recipe/:id" element={<ViewRecipe />} />
                
                {/* New pages */}
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/shipping" element={<ShippingPolicy />} />
                <Route path="/returns" element={<Returns />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/search" element={<Search />} />
                <Route path="/seasonal-items" element={<SeasonalItems />} />
                <Route path="/coupons" element={<Coupons />} />
                <Route path="/map-tracking" element={<MapTracking />} />
                
                {/* Checkout and Order routes */}
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/order-confirmation" element={<OrderConfirmation />} />
                <Route path="/track-order/:orderId" element={<TrackOrder />} />
                <Route path="/orders" element={<Orders />} />
                {/* Fallback route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </TooltipProvider>
          </BrowserRouter>
        </CartProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
