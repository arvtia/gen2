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
        { key: "imagesCollection", label: "Image Collection", type: "file", multiple: true }, 
        // i have added a new input for make products visible or hidden
       { key: "visible", label: "Visible on Storefront", type: "checkbox" }
       
        // { key: "visible", label: "Visible on Storefront", type: "checkbox" } 
    ];

const DynamicProductForm = ({
    product,
    setProduct,
    onSubmit,
    schema,
    submitLabel = "Submit"
    }) => {
    const handleChange = (key, value, type) => {
        let newValue = value;
        if (type === "number") newValue = parseFloat(value);
        if (key === "visible") newValue = value === "true" || value === true;
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

            if (type === "checkbox") {
            return (
                <div className="form-check mb-3" key={key}>
                <input
                    type="checkbox"
                    className="form-check-input"
                    id={key}
                    checked={value}
                    onChange={(e) =>
                    setProduct({ ...product, [key]: e.target.checked })
                    }
                />
                <label className="form-check-label" htmlFor={key}>
                    {label}
                </label>
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

            if (type === "file") {
                return (
                    <div className="mb-3" key={key}>
                        <label className="form-label">{label}</label>
                        <input
                            type="file"
                            className="form-control"
                            accept="image/*"
                            multiple={field.multiple}
                            onChange={(e) => {
                                const files = Array.from(e.target.files);
                                const fileNames = files.map(file => file.name);
                                setProduct({
                                    ...product,
                                    [key]: [...(product[key] || []), ...fileNames]
                                });
                            }}
                        />

                        <div className="d-flex flex-wrap mt-3 gap-2">
                            {Array.isArray(product[key]) &&
                                product[key].map((fileName, index) => (
                                    <div key={index} style={{ position: "relative" }}>
                                        <img
                                            src={`/assests/images/${fileName}`}
                                            alt={`preview-${fileName}`}
                                            style={{
                                                width: 100,
                                                height: 100,
                                                objectFit: "cover",
                                                border: "1px solid #ccc",
                                                borderRadius: 4,
                                            }}
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-danger"
                                            style={{
                                                position: "absolute",
                                                top: -5,
                                                right: -5,
                                                padding: "2px 6px",
                                                borderRadius: "50%",
                                                fontSize: 12,
                                            }}
                                            onClick={() => {
                                                const updated = product[key].filter((_, i) => i !== index);
                                                setProduct({ ...product, [key]: updated });
                                            }}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                        </div>
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
        })
        }

        <button type="submit" className="btn btn-success w-100">
            {submitLabel}
        </button>
        </form>
    );
};

export default DynamicProductForm;