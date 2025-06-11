import { useEffect, useState } from 'react';
import { Link} from 'react-router-dom'


const FilterProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3002/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data); 
      })
      .catch((err) => console.error('Error fetching data:', err));
  }, []);

  if (!products.length) return <p>Loading products...</p>;

  return (
        <div className="py-4 mt-5">
            <div className="mb-3 px-2 ms-2 mt-5">Categories</div>
            <div className="py-2">
                <div className="container-fluid">
                     <div className="row gy-2 d-flex flex-wrap ">
                        {
                            products.map((item) =>(
                                <Link to={""} className="col-12 col-md-6 col-lg-3 col-xl-3 card">
                                    <div className="card-body">
                                        <img src={item.Categoryimg} alt="category image" className='img-fluid p-2' style={{width:"250px", height:"250px",objectFit:"cover"}} />
                                        <p className='fs-5 fw-bold text-dark'>{item.categoryName}</p>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
  );
};

export default FilterProducts;
