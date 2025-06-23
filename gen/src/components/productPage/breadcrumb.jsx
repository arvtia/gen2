import { Link, useParams } from "react-router-dom";

const Breadcrumbs = () => {
  const { id: productId } = useParams();
  const pathParts = window.location.pathname.split("/");

  const category = pathParts[2]; // category/Neckbands/product/10 → ["", "category", "Neckbands", "product", "10"]

  return (
    <div className="pt-5">
        <div className="mt-5 ms-3 w-75">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb ">
                    <li className="breadcrumb-item "><Link to="/" className="text-dark text-un-none">Home</Link></li>
                    <li className="breadcrumb-item "><Link to={`/category/${category}`} className="text-dark text-un-none ">{category}</Link></li>
                    {/* <li className="breadcrumb-item active" aria-current="page">Product {productId}</li> */}
                </ol>
            </nav>
        </div>
    </div>
  );
};

export default Breadcrumbs;