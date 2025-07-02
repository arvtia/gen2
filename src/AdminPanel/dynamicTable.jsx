
import "./Table.css"; // keep your custom styling

const columns = [
  { key: "productName", label: "Product Name" },
  { key: "color", label: "Color" },
  { key: "price", label: "Price" },
  { key: "discount", label: "Discount" },
  { key: "size", label: "Size" },
  { key: "inStock", label: "In Stock" },
  { key: "category", label: "Category" },
  { key: "categoryImg", label: "Category Image" },
  { key: "subcategory", label: "Subcategory" },
  { key: "brand", label: "Brand" },
  { key: "specifications", label: "Specifications" },
  { key: "tags", label: "Tags" },
  { key: "description", label: "Description" },
  { key: "imagesCollection", label: "Images Collection" },
];

const renderCell = (product, key) => {
  switch (key) {
    case "categoryImg":
      return (
        <img
          src={product[key]}
          alt="category"
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
      );

    case "specifications":
      return (
        <div className="p-1 tooltip-container">
          Hover me
          <div className="tooltip-content">
            <ul>
              {product[key]?.map((item, i) => (
                <li key={i} className="text-start">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      );
      case "description":
            return (
                <div
                style={{
                    maxHeight: "80px",
                    overflowY: "auto",
                    whiteSpace: "pre-wrap",
                    paddingRight: "4px"
                }}
                >
                    {product[key]}
                </div>
            );

    case "tags":
        return (
            <ul>
            {product[key]?.map((tag, i) => (
                <li key={i}>{tag}</li>
            ))}
            </ul>
        );

    case "imagesCollection":
      return (
        <div className="d-flex overflow-x-scroll gap-2">
            {product[key]?.map((img, i) =>
                img ? (
                <img
                    key={i}
                    src={img}
                    alt={`product-img-${i}`}
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
                ) : null
            )}
        </div>
      );

    default:
      const val = product[key];
      return Array.isArray(val) ? val.join(", ") : val || "N/A";
  }
};

const DynamicProductTable = ({ productList, onEdit, onDelete }) => {
  return (
        <div className="py-5 px-2 my-5">
            <p className="display-2">Product List</p>
            <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover">
                    <thead className="thead-dark">
                        <tr>
                            {columns.map((col) => (
                                <th key={col.key}>{col.label}</th>
                            ))}
                            <th>Actions</th>
                            <th>Visibility</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productList.map((product) => (
                            <tr key={product.id}>
                                {columns.map((col) => (
                                <td key={col.key}>{renderCell(product, col.key)}</td>
                                ))}
                                <td className="cupid-case d-flex align-items-center overflow-auto">
                                    <button
                                        className="btn bg-primary text-white me-2"
                                        onClick={() => onEdit(product)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn text-white bg-danger bg-hover-dark"
                                        onClick={() => onDelete(product.id)}
                                    >
                                        Delete
                                    </button>

                                </td>
                                    {/* visibility hide or show products */}
                                <td className="align-items-center">
                                    <span className={`badge ${product.visible ? "bg-success" : "bg-secondary"}`}>
                                        {product.visible ? "Visible" : "Hidden"}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
  );
};

export default DynamicProductTable;