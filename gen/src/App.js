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
import AdminProductList from "./AdminPanel/crud";
import CategoryPage from "./components/shop/CategoryPage";
import UserPanel from "./pages/user";
import LoginPage from "./pages/login";
import RegisterNew from "./components/userPageClient/RegisterNew";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadCart } from "./redux/cartActions";
import MainProducts from "./pages/products";
import MainProducts2 from "./components/productPage/mainProduct";


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
        <Route path="/shop" element={ <ShopNow />} />
        <Route path="/category/:name" element={<CategoryPage />} />
        <Route path="/user" element = {<UserPanel />} />
        <Route path="/login" element={ <LoginPage />} />
        <Route path="/register" element={ <RegisterNew />} />
        <Route path="/category/:id/product/:id" element ={<MainProducts /> } />
        <Route path="/product/:id" element={<MainProducts /> } />

    

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

    const dispatch = useDispatch();
        useEffect(() => {
            dispatch(loadCart());
        }, [dispatch]);
  return (
    <BrowserRouter>
        <AppLayout />
    </BrowserRouter>
  );
}