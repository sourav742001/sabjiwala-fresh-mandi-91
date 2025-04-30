
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Shop from "./pages/Shop";
import VegetableDetails from "./pages/VegetableDetails";
import Cart from "./pages/Cart";
import Categories from "./pages/Categories";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "./context/CartContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <BrowserRouter>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/vegetable/:id" element={<VegetableDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/categories" element={<Categories />} />
            {/* Add additional routes here as we build more pages */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </BrowserRouter>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
