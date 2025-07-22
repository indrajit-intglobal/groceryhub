import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import ProductListing from "./pages/ProductListing";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Deals from "./pages/Deals";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import OrderConfirmation from "./pages/OrderConfirmation";
import NotFound from "./pages/NotFound";
import { useSelector, useDispatch } from "react-redux";
import { initializeAuth } from "@/utils/slices/AuthSlice";
import { getUserCart } from "@/utils/slices/CartSlice";

const queryClient = new QueryClient();

type AppState = {
  auth: {
    session_token: string | null;
    refresh_token: string | null;
    user: any;
    loading: boolean;
    error: string | null;
    authInitialized: boolean;
  };
};

// ProtectedRoute: Only for authenticated users
function ProtectedRoute({ children }) {
  const user = useSelector((state: AppState) => state.auth.session_token);
  return user ? children : <Navigate to="/login" replace />;
}

// PublicRoute: Only for unauthenticated users
function PublicRoute({ children }) {
  const user = useSelector((state: AppState) => state.auth.session_token);
  return !user ? children : <Navigate to="/profile" replace />;
}

const Loader = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      width: "100vw",
      background: "#fff",
      zIndex: 9999,
      position: "fixed",
      top: 0,
      left: 0,
    }}
  >
    <svg className="pl" width={240} height={240} viewBox="0 0 240 240">
      <circle
        className="pl__ring pl__ring--a"
        cx={120}
        cy={120}
        r={105}
        fill="none"
        stroke="#000"
        strokeWidth={20}
        strokeDasharray="0 660"
        strokeDashoffset={-330}
        strokeLinecap="round"
      />
      <circle
        className="pl__ring pl__ring--b"
        cx={120}
        cy={120}
        r={35}
        fill="none"
        stroke="#000"
        strokeWidth={20}
        strokeDasharray="0 220"
        strokeDashoffset={-110}
        strokeLinecap="round"
      />
      <circle
        className="pl__ring pl__ring--c"
        cx={85}
        cy={120}
        r={70}
        fill="none"
        stroke="#000"
        strokeWidth={20}
        strokeDasharray="0 440"
        strokeLinecap="round"
      />
      <circle
        className="pl__ring pl__ring--d"
        cx={155}
        cy={120}
        r={70}
        fill="none"
        stroke="#000"
        strokeWidth={20}
        strokeDasharray="0 440"
        strokeLinecap="round"
      />
    </svg>
  </div>
);

const App = () => {
  const dispatch = useDispatch();
  const user_id = useSelector((state) => state.auth.user?.id);
  console.log(user_id);
  const session_token = sessionStorage.getItem("session_token");
  useEffect(() => {
    if (session_token && user_id) {
      dispatch(getUserCart(user_id));
    }
  }, [user_id]);
  const authInitialized = useSelector(
    (state: AppState) => state.auth.authInitialized
  );
  React.useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  if (!authInitialized) {
    return <Loader />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<ProductListing />} />
            <Route path="/products/:category" element={<ProductListing />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/deals/:type" element={<Deals />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
