import AdminFooter from "./footer";
import AdminProductForm from "./form";
import AdminNavbar from "./Navbar";


import AdminProductList from "./productList"


const Admin = () =>{
    return(
        <>
        <AdminNavbar />
        
        <AdminProductList />
        <AdminProductForm />
        

        <AdminFooter />
        </>
    )
}

export default Admin;