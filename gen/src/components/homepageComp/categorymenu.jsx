
// // NOT IN USE NOW - MIGHT USE LATER IF NEEDED =  SIDE CATEGORY - FILTER UI 

// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// const CategoryMenu = () => {
//   const [categories, setCategories] = useState([]);
//   const [sortOption, setSortOption] = useState("price_low_high");
//   const [filterTag, setFilterTag] = useState("");

//   useEffect(() => {
//     fetch("http://localhost:3002/products")
//       .then((res) => res.json())
//       .then((data) => setCategories(data))
//       .catch((err) => console.error("Failed to fetch products:", err));
//   }, []);

//   // Sorting Function
//   const sortData = (categories, sortType) => {
//     return categories.map((category) => ({
//       ...category,
//       subcategories: category.subcategories.map((subcategory) => ({
//         ...subcategory,
//         products: [...subcategory.products].sort((a, b) => {
//           if (sortType === "price_low_high") return a.price - b.price;
//           if (sortType === "price_high_low") return b.price - a.price;
//           if (sortType === "discount_high_low") return parseInt(b.discount) - parseInt(a.discount);
//           return 0;
//         }),
//       })),
//     }));
//   };

//   // Filtering Function
//   const filterByTag = (categories, selectedTag) => {
//     return categories.map((category) => ({
//       ...category,
//       subcategories: category.subcategories.map((subcategory) => ({
//         ...subcategory,
//         products: subcategory.products.filter((product) => product.tags.includes(selectedTag)),
//       })),
//     }));
//   };

//   const sortedAndFilteredData = sortData(filterByTag(categories, filterTag), sortOption);

//   return (
//     <div className="col-12  px-2">
//       <div className="col-auto">
//         <p className="fs-4 fw-bolder text-dark">Category</p>

//         {/* Sorting Dropdown */}
//         <select className="form-select mb-2" onChange={(e) => setSortOption(e.target.value)}>
//           <option value="price_low_high">Price: Low to High</option>
//           <option value="price_high_low">Price: High to Low</option>
//           <option value="discount_high_low">Discount: High to Low</option>
//         </select>

//         {/* Tag Filtering */}
//         <select className="form-select mb-2" onChange={(e) => setFilterTag(e.target.value)}>
//           <option value="">All Tags</option>
//           <option value="trending">Trending</option>
//           <option value="smart pick">Smart Pick</option>
//           <option value="zen-gy verified">Zen-gy Verified</option>
//           <option value="top seller">Top Seller</option>
//         </select>

//         {/* Display Categories */}
//         <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start">
//           {sortedAndFilteredData.map((category) => (
//             <li key={category.name} className="nav-item">
//               <Link to="#" className="nav-link px-0 text-dark fs-5">
//                 {category.name}
//               </Link>

//               {/* Subcategories */}
//               {category.subcategories.map((subcategory) => (
//                 <ul key={subcategory.subcategoryName} className="nav flex-column ms-2">
//                   <li className="nav-item">
//                     <Link to="#" className="nav-link ps-2 text-dark fw-bold">
//                       {subcategory.subcategoryName}
//                     </Link>

//                     {/* Products */}
//                     <ul className="list-unstyled ms-3">
//                       {subcategory.products.map((product) => (
//                         <li key={product.productId} className="text-dark">
//                           <p>
//                             {product.productName} - <strong>${product.price}</strong>{" "}
//                             ({product.discount} off)
//                           </p>
//                         </li>
//                       ))}
//                     </ul>
//                   </li>
//                 </ul>
//               ))}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default CategoryMenu;