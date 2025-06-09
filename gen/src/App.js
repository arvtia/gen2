import { BrowserRouter, Routes, Route, useLocation } from "react-router";

import Footer from "./components/footer";
import Home from "./pages/home";
import Navbar from "./components/navbar";


import AdminFooter from "./AdminPanel/components/footer";
import AdminHome from "../src/AdminPanel/Admin";
import AboutUs from "./pages/About";




function AppLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {/* Show client navbar/footer only on non-admin routes */}
      {!isAdminRoute && <Navbar />}
      
      <Routes>
       
        <Route path="/" element={<Home />} />
        <Route path="/about" element={< AboutUs/>} />
    
        <Route path="/admin" element={<AdminHome/>} />

      </Routes>

      {!isAdminRoute && <Footer />}
      {isAdminRoute && <AdminFooter />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
