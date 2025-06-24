export const productFormSchema = 
    [
        { key: "productName", label: "Product Name", type: "text" },
        { key: "price", label: "Price", type: "number" },
        {
            key: "color",
            label: "Color",
            type: "datalist",
            options: [
            "Black", "White", "Gray", "Silver", "Blue", "Red", "Green",
            "Yellow", "Gold", "Purple", "Pink", "Orange", "Transparent", "RGB / Multicolor"
            ]
        },
        { key: "discount", label: "Discount (%)", type: "number" },
        {
            key: "size",
            label: "Size",
            type: "datalist",
            options: ["Small", "Medium", "Large", "Ergonomic"]
        },
        { key: "inStock", label: "Stock Quantity", type: "number" },
        {
            key: "category",
            label: "Category",
            type: "datalist",
            options: [
            "TWS", "Neckbands", "Sound Bars", "Speakers", "Headphones", "wired earphone",
            "bluetooth speaker", "Party Speaker", "Charger", "Data cables", "Power Bank", "Wireless car play"
            ]
        },
        { key: "categoryImg", label: "Category Image URL", type: "text" },
        {
            key: "subcategory",
            label: "Subcategory",
            type: "datalist",
            options: [
            "Party Speaker", "Neck band", "Sound Bar", "Chargers",
            "Wireless Earphones", "Bluetooth Speaker", "Earbuds"
            ]
        },
        {
            key: "brand",
            label: "Brand",
            type: "datalist",
            options: [
            "Sony", "Bose", "JBL", "Sennheiser", "Beats",
            "Skullcandy", "Boat", "Zebronics", "Nothing"
            ]
        },
        {
            key: "tags",
            label: "Tags",
            type: "multiselect",
            options: ["Smart Pick", "Zen-Gy Verified", "Trending", "Top Sellers"]
        },
        { key: "description", label: "Description", type: "text" },
        { key: "specifications", label: "Specifications", type: "array" },
        { key: "imagesCollection", label: "Image Collection", type: "array" }   
    ];



const DynamicProductForm = ({
  product,
  setProduct,
  onSubmit,
  schema,
  submitLabel = "Submit"
}) => {
  const handleChange = (key, value, type) => {
    const newValue = type === "number" ? parseFloat(value) : value;
    setProduct({ ...product, [key]: newValue });
  };

  return (
    <form onSubmit={onSubmit}>
      {schema.map((field) => {
        const { key, label, type, options } = field;
        const value = product[key] ?? (type === "array" ? [] : "");

        if (type === "array") {
          return (
            <div className="mb-3 d-flex flex-column" key={key}>
              <label className="form-label">{label}</label>
              {value.map((item, i) => (
                <div className="input-group mb-1" key={i}>
                  <input
                    type="text"
                    className="form-control"
                    value={item}
                    onChange={(e) => {
                      const updated = [...value];
                      updated[i] = e.target.value;
                      setProduct({ ...product, [key]: updated });
                    }}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() =>
                      setProduct({
                        ...product,
                        [key]: value.filter((_, idx) => idx !== i)
                      })
                    }
                  >
                    <i className="bi bi-x" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-outline-primary btn-sm"
                onClick={() => setProduct({ ...product, [key]: [...value, ""] })}
              >
                Add {label.toLowerCase()}
              </button>
            </div>
          );
        }

        if (type === "multiselect") {
          return (
            <div className="mb-3" key={key}>
              <label className="form-label">{label}</label>
              <select
                className="form-select"
                multiple
                value={value}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    [key]: Array.from(e.target.selectedOptions, (o) => o.value)
                  })
                }
              >
                {options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          );
        }

        if (type === "datalist") {
          return (
            <div className="mb-3" key={key}>
              <label className="form-label">{label}</label>
              <input
                className="form-control"
                list={`list-${key}`}
                value={value}
                onChange={(e) => handleChange(key, e.target.value, type)}
              />
              <datalist id={`list-${key}`}>
                {options.map((opt) => (
                  <option key={opt} value={opt} />
                ))}
              </datalist>
            </div>
          );
        }

        return (
          <div className="mb-3" key={key}>
            <label className="form-label">{label}</label>
            <input
              type={type}
              className="form-control"
              value={value}
              onChange={(e) => handleChange(key, e.target.value, type)}
            />
          </div>
        );
      })}

      <button type="submit" className="btn btn-success w-100">
        {submitLabel}
      </button>
    </form>
  );
};

export default DynamicProductForm;