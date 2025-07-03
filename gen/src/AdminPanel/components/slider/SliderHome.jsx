import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSliderImage,
  deleteSliderImage,
  fetchImagesSlider,
  updateSliderImage,
} from "../../ReduxAdmin/sliderSlice";
import "./style.css";

function SliderHome() {
  const dispatch = useDispatch();
  const slides = useSelector((state) => state.sliderImage.items);
  const error = useSelector((state) => state.sliderImage.error);

  const [inputImg, setInputImg] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [editedFile, setEditedFile] = useState(null);

  useEffect(() => {
    dispatch(fetchImagesSlider());
  }, [dispatch]);

  const handleAddImage = (e) => {
    e.preventDefault();
    if (inputImg) {
      dispatch(addSliderImage({ img: inputImg }));
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteSliderImage(id));
  };

  const handleEdit = (item) => {
    setEditingItem(item); // just store the item, actual update happens in modal submit
  };

  const handleSubmitEdit = () => {
    if (editingItem && editedFile) {
      dispatch(
        updateSliderImage({
          ...editingItem,
          img: editedFile.name, // Assuming backend uses file name from public/assets/slider
        })
      );
      setEditingItem(null);
      setEditedFile(null);
    }
  };

  return (
    <div className="container-fluid mx-auto py-3">
      {error && <p className="text-danger">Error: {error}</p>}

      <div className="py-2 px-2 px-lg-4">
        <div className="col-12 col-md-6 col-lg-4 col-xl-4 ms-auto">
          <form onSubmit={handleAddImage} className="d-flex">
            <input
              type="file"
              className="form-control very-soft-shadow"
              id="imagenext"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) setInputImg(file.name);
              }}
            />
            <button className="btn very-soft-shadow ms-2" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>

      <div className="py-3">
        {slides.length > 0 ? (
          <div className="d-flex flex-wrap gap-3 justify-content-center">
            {slides.map((item, index) => (
              <div
                className="position-relative border rounded shadow-sm overflow-auto very-soft-shadow"
                style={{ width: "180px", height: "180px" }}
                key={index}
              >
                <div
                  className="position-absolute top-0 end-0 p-1 d-flex gap-1"
                  style={{ zIndex: 1 }}
                >
                  <button
                    className="btn btn-sm soft-blur text-white"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                    onClick={() => handleEdit(item)}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="btn btn-sm soft-blur text-white"
                    onClick={() => handleDelete(item.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>

                <img
                  src={`/assests/slider/${item.img}`}
                  alt={`Image ${index}`}
                  className="w-100 h-100 object-fit-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <div>
            <p>no images in the slider</p>
          </div>
        )}
      </div>

      {/* Modal structure preserved as requested */}
      <>
        <div
          className="modal fade soft-blur"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex={-1}
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>

              <div className="modal-footer">
                <input
                  type="file"
                  className="form-control very-soft-shadow"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setEditedFile(file);
                    }
                  }}
                />
                <button
                  type="button"
                  className="btn very-soft-shadow"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn very-soft-shadow"
                  data-bs-dismiss="modal"
                  onClick={handleSubmitEdit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default SliderHome;
