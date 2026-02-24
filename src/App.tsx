import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Cart from "./pages/Cart";
import OurStory from "./pages/OurStory";
import Impact from "./pages/Impact";
import BulkOrders from "./pages/BulkOrders";
import NotFound from "./pages/NotFound";
import MarketPlace from "./pages/MarketPlace";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Dashboard from "./pages/dashboard";
import OpenRoute from "./components/auth/OpenRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <CartProvider>
          <Sonner position="top-right" closeButton richColors />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/login" element={<OpenRoute><Login /></OpenRoute>} />
              <Route path="/signup" element={<OpenRoute><Signup /></OpenRoute>} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<OpenRoute><ResetPassword /></OpenRoute>} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/our-story" element={<OurStory />} />
              <Route path="/impact" element={<Impact />} />
              <Route path="/bulk-orders" element={<BulkOrders />} />
              <Route path="/marketplace" element={<MarketPlace />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
