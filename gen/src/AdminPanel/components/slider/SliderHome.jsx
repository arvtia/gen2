import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSliderImage, deleteSliderImage, fetchImagesSlider, updateSliderImage } from "../../ReduxAdmin/sliderSlice";

function SliderHome() {
  const dispatch = useDispatch();
  const slides = useSelector((state) => state.sliderImage.items);
  const error = useSelector((state) => state.sliderImage.error); // Error from Redux state
  const [inputImg, setInputImg] = useState("");

  useEffect(() => {
    dispatch(fetchImagesSlider());
  }, [dispatch]);

  const handleAddImage = (e) => {
    e.preventDefault();
    if (inputImg.trim()) {
      dispatch(addSliderImage({ img: inputImg }));
      setInputImg("");
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteSliderImage(id));
  };

  const handleEdit = (item) => {
    const newImg = prompt("New image URL:", item.img);
    if (newImg) {
      dispatch(updateSliderImage({ ...item, img: newImg }));
    }
  };

  return (
    <div className="container py-3">
      {error && <p className="text-danger">Error: {error}</p>} {/* Display error message */}
      <div className="py-2">
        <div className="col-12 col-md-6 col-lg-4 col-xl-4 me-auto">
          <form onSubmit={handleAddImage}>
            <label htmlFor="imagenext" className="label">
              Paste the Link of the image you wanna add:
            </label>
            <input
              type="text"
              className="form-control"
              id="imagenext"
              value={inputImg}
              onChange={(e) => setInputImg(e.target.value)}
            />
            <button className="btn btn-outline-dark mt-2" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>

      <div className="table-responsive mt-4">
        {slides.length > 0 ? (
          <table className="table table-bordered table-hover text-center align-middle">
            <thead className="table-dark">
              <tr>
                <th>No</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {slides.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={item.img}
                      alt={`slide-${index}`}
                      className="img-thumbnail"
                      style={{ maxHeight: "100px" }}
                    />
                  </td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <button
                        className="btn  btn-outline-dark"
                        onClick={() => handleEdit(item)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button
                        className="btn  btn--outline-danger"
                        onClick={() => handleDelete(item.id)}
                      >
                        <i className="bi bi-eraser"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center">No slides to display.</p>
        )}
      </div>
    </div>
  );
}

export default SliderHome;
