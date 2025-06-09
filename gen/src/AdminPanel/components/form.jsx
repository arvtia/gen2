import { useState } from 'react';

export default function AdminProductForm() {
  const [formData, setFormData] = useState({
    product_id: '',
    brand_name: '',
    product_name: '',
    price: '',
    image: '',
    specifications: '',
    catergory: '',
    review: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const specsArray = formData.specifications
      .split(',')
      .map(s => s.trim())
      .filter(s => s); // Remove empty strings

    const newProduct = { ...formData, specifications: specsArray };

    try {
      const res = await fetch('http://localhost:5000/Products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });

      if (res.ok) {
        alert('✅ Product added!');
        setFormData({
          product_id: '',
          brand_name: '',
          product_name: '',
          price: '',
          image: '',
          specifications: '',
          catergory: '',
          review: '',
        });
      } else {
        alert('❌ Error adding product');
      }
    } catch (error) {
      console.error('Failed to add product:', error);
      alert('❌ Network error');
    }
  };

  return (
    <div className="container py-5">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Add New Product</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Product ID</label>
                <input
                  type="text"
                  className="form-control"
                  name="product_id"
                  value={formData.product_id}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Brand Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="brand_name"
                  value={formData.brand_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="product_name"
                  value={formData.product_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Price</label>
                <input
                  type="text"
                  className="form-control"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-12">
                <label className="form-label">Image URL</label>
                <input
                  type="text"
                  className="form-control"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-12">
                <label className="form-label">Specifications</label>
                <input
                  type="text"
                  className="form-control"
                  name="specifications"
                  value={formData.specifications}
                  onChange={handleChange}
                  placeholder="e.g. Bluetooth 5.2, Noise Cancellation"
                  required
                />
                <div className="form-text">Separate each spec with a comma.</div>
              </div>
              <div className="col-md-6">
                <label className="form-label">Category</label>
                <input
                  type="text"
                  className="form-control"
                  name="catergory"
                  value={formData.catergory}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Review</label>
                <input
                  type="text"
                  className="form-control"
                  name="review"
                  value={formData.review}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mt-4 text-end">
              <button type="submit" className="btn btn-success">
                <i className="bi bi-plus-circle me-2"></i> Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
