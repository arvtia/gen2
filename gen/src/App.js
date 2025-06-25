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
import { getUserId, setUserId } from "./getUserId";
import { useState } from "react";




// function AppLayout() {
//   const location = useLocation();
//   const isAdminRoute = location.pathname.startsWith("/admin");

//   return (
//     <>
//       {/* Show Client Navbar/Footer on non-admin routes */}
//       {!isAdminRoute && <Navbar />}
//       {isAdminRoute && <AdminNavbar />}

//       {/* Main Routing Section */}
//       <Routes>
//         {/* Client Routes */}
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<AboutUs />} />
//         <Route path="/contactus" element={<ContactUs />} />
//         <Route path="*" element={<ErrorPage />} />
//         <Route path="/shop" element={ <ShopNow />} />
//         <Route path="/category/:name" element={<CategoryPage />} />
//         <Route path="/user" element = {<UserPanel />} />
//         <Route path="/login" element={ <LoginPage />} />
//         <Route path="/register" element={ <RegisterNew />} />
//         <Route path="/category/:id/product/:id" element ={<MainProducts /> } />
//         <Route path="/product/:id" element={<MainProducts /> } />

    

//         {/* Admin Routes */}
//         <Route path="/admin" element={<AdminHome />}>
//             <Route path="products" element={<AdminProductList />} />
//             <Route path="users" element={<Users />} />
//             <Route path="settings" element={<Settings />} />
//         </Route>
//       </Routes>

//       {/* Show Client/Footer only when NOT in Admin Panel */}
//       {!isAdminRoute && <Footer />}
//       {isAdminRoute && <AdminFooter />}
//     </>
//   );
// }


function AppLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  const [showToast, setShowToast] = useState(() => !getUserId());

  const handleConsent = () => {
    setUserId();
    setShowToast(false);
  };

  return (
    <>
      {!isAdminRoute && <Navbar />}
      {isAdminRoute && <AdminNavbar />}

      {/* Bootstrap Consent Toast */}
      {showToast && (
        <div
          className="toast-container position-fixed bottom-0 start-0 p-3"
          style={{ zIndex: 1055 }}
        >
          <div className="toast show bg-light" role="alert">
            <div className="toast-header">
              <strong className="me-auto">- Your Privacy, Our Priority</strong>
            </div>
            <div className="toast-body justify-content-between align-items-center">
                To deliver the best possible experience on our platform, we’d like to store a unique, anonymous identifier in your browser using cookies. This small piece of information helps us remember your session, personalize features, and ensure the site runs smoothly—especially when managing your preferences, keeping your cart updated, or improving load times.
                We do not store any sensitive personal information, and the ID is used solely to enhance your browsing experience across visits.
                Clicking <mark className="p-2 font-monospace">OK</mark>  confirms you’re comfortable with this and allows us to better tailor the app to you.

              <button onClick={handleConsent} className="btn btn-success btn-sm ms-3 w-50 my-2">
                OK
              </button>
            </div>
          </div>
        </div>
      )}

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
    <BrowserRouter future={{
        v7_startTransition: true, }} >
        <AppLayout />
    </BrowserRouter >
  );
}