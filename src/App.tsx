
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import ScrollToTop from './components/ScrollToTop';
import Index from './pages/Index';
import Shop from './pages/Shop';
import VegetableDetails from './pages/VegetableDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import OrderConfirmation from './pages/OrderConfirmation';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import TrackOrder from './pages/TrackOrder';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';
import Search from './pages/Search';
import Categories from './pages/Categories';
import Recipes from './pages/Recipes';
import ViewRecipe from './pages/ViewRecipe';
import MapTracking from './pages/MapTracking';
import SeasonalItems from './pages/SeasonalItems';
import FAQ from './pages/FAQ';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Returns from './pages/Returns';
import ShippingPolicy from './pages/ShippingPolicy';
import Coupons from './pages/Coupons';
import Favorites from './pages/Favorites';
import { useEffect } from 'react';

// Auth guard component to protect routes
const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  // Check if user was previously logged in (persistent login)
  const isPreviouslyLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  // Check if the user just logged in in this session
  const isCurrentlyLoggedIn = sessionStorage.getItem('isLoggedInSession') === 'true';
  
  if (!isPreviouslyLoggedIn && !isCurrentlyLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  // If the user is currently logged in but not persistently, update localStorage
  if (!isPreviouslyLoggedIn && isCurrentlyLoggedIn) {
    localStorage.setItem('isLoggedIn', 'true');
  }
  
  return <>{children}</>;
};

function App() {
  // Effect to set session login flag when app loads
  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      // Mark that the user is logged in for this session
      sessionStorage.setItem('isLoggedInSession', 'true');
    }
  }, []);

  return (
    <Router>
      <CartProvider>
        <FavoritesProvider>
          <ScrollToTop />
          <Toaster position="top-right" />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/vegetable/:id" element={<VegetableDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={
              <RequireAuth>
                <Checkout />
              </RequireAuth>
            } />
            <Route path="/payment" element={
              <RequireAuth>
                <Payment />
              </RequireAuth>
            } />
            <Route path="/order-confirmation" element={
              <RequireAuth>
                <OrderConfirmation />
              </RequireAuth>
            } />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            } />
            <Route path="/orders" element={
              <RequireAuth>
                <Orders />
              </RequireAuth>
            } />
            <Route path="/track-order/:id" element={
              <RequireAuth>
                <TrackOrder />
              </RequireAuth>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/search" element={<Search />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/recipe/:id" element={<ViewRecipe />} />
            <Route path="/map-tracking" element={
              <RequireAuth>
                <MapTracking />
              </RequireAuth>
            } />
            <Route path="/seasonal-items" element={<SeasonalItems />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="/shipping" element={<ShippingPolicy />} />
            <Route path="/coupons" element={<Coupons />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </FavoritesProvider>
      </CartProvider>
    </Router>
  );
}

export default App;
