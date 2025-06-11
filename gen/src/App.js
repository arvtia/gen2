import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./pages/home";
import AboutUs from "./pages/About";
import ContactUs from "./pages/contactus";
import ErrorPage from "./pages/Error";

import AdminNavbar from "./AdminPanel/components/Navbar";
import AdminFooter from "./AdminPanel/components/footer";
import AdminHome from "./AdminPanel/Admin";
import { Settings, Users } from "./AdminPanel/components/sample";
import ShopNow from "./pages/shop";
import AdminProductList from "./AdminPanel/components/productList";

function AppLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {/* Show Client Navbar/Footer on non-admin routes */}
      {!isAdminRoute && <Navbar />}
      {isAdminRoute && <AdminNavbar />}

      {/* Main Routing Section */}
      <Routes>
        {/* Client Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/cart" element={ <ShopNow />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminHome />}>
            <Route path="products" element={<AdminProductList />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>

      {/* Show Client/Footer only when NOT in Admin Panel */}
      {!isAdminRoute && <Footer />}
      {isAdminRoute && <AdminFooter />}
    </>
  );
}

// Wrap AppLayout with BrowserRouter
export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}