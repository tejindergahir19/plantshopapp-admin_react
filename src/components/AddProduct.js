import { useEffect, useState } from "react";

import { db } from "../firebase";
import { getDocs, collection, addDoc } from "firebase/firestore";

function AddProduct() {
  const [isAdding, setIsAdding] = useState(false);

  const [categories, setCategories] = useState(null);

  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [category, setCategory] = useState(null);
  const [price, setPrice] = useState(null);
  const [plantType, setPlantType] = useState(null);
  const [size, setSize] = useState(null);
  const [height, setHeight] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [waterEvery, setWaterEvery] = useState(null);
  const [rating, setRating] = useState(null);
  const [unit, setUnit] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);

  const handleSubmit = async () => {
    setIsAdding(true);
    console.log(
      title,
      desc,
      category,
      price,
      plantType,
      size,
      height,
      humidity,
      waterEvery,
      rating,
      unit,
      imgUrl
    );

    try {
      // Add a new document with a generated id.
      const docRef = await addDoc(collection(db, "tbl_plant_data"), {
        title: title,
        category: category,
        currency: "₹",
        description: desc,
        height: height,
        humidity: humidity,
        img: imgUrl,
        plantType: plantType,
        price: price,
        rating: rating,
        size: size,
        unit: unit,
        waterEvery: waterEvery,
      });
      alert("Product Added !");
      window.location.replace("./product");
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      alert("Unable to add product at this moment !");
    }

    setIsAdding(false);
  };

  const fetchCategories = async () => {
    let tmpData = [];
    try {
      const querySnapshot = await getDocs(collection(db, "tbl_categories"));
      querySnapshot.forEach((doc) => {
        tmpData.push({
          id: doc.id,
          data: doc.data().category,
        });
      });
      console.log(tmpData);
    } catch (error) {
      console.log("Unable to fetch products " + error);
    }

    setCategories(tmpData);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add Product
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form className="row g-3">
                <div className="col-md-12">
                  <label htmlFor="inputEmail4" className="form-label">
                    Title
                  </label>
                  <input
                    onKeyUp={(e) => setTitle(e.target.value)}
                    type="text"
                    className="form-control"
                    id="inputEmail4"
                    placeholder="Enter Title"
                  />
                </div>
                <div className="col-md-12">
                  <label htmlFor="inputPassword4" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    onKeyUp={(e) => setDesc(e.target.value)}
                    className="form-control"
                    id="inputPassword4"
                    placeholder="Enter Description"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputPassword4" className="form-label">
                    Category
                  </label>
                  <input
                    type="text"
                    onKeyUp={(e) => setCategory(e.target.value)}
                    className="form-control"
                    id="inputPassword4"
                    placeholder="Enter Category"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputPassword4" className="form-label">
                    Price
                  </label>
                  <input
                    type="number"
                    onKeyUp={(e) => setPrice(e.target.value)}
                    min="1"
                    placeholder="Enter Price"
                    className="form-control"
                    id="inputPassword4"
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="inputState" className="form-label">
                    Plant Type
                  </label>
                  <select
                    onChange={(e) => setPlantType(e.target.value)}
                    id="inputState"
                    className="form-select"
                  >
                    <option selected="">Select</option>
                    {categories?.map((item, key) => (
                      <option key={key} value={item.data}>
                        {item.data.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label htmlFor="inputState" className="form-label">
                    Size
                  </label>
                  <select
                    onChange={(e) => setSize(e.target.value)}
                    id="inputState"
                    className="form-select"
                  >
                    <option selected="">Select</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>

                <div className="col-md-3">
                  <label htmlFor="inputState" className="form-label">
                    Height
                  </label>
                  <select
                    onChange={(e) => setHeight(e.target.value)}
                    id="inputState"
                    className="form-select"
                  >
                    <option selected="">Select</option>
                    {[
                      "1",
                      "2",
                      "3",
                      "4",
                      "5",
                      "6",
                      "7",
                      "8",
                      "9",
                      "10",
                      "11",
                      "12",
                      "13",
                      "14",
                      "15",
                      "16",
                      "17",
                      "18",
                      "19",
                      "20",
                      "21",
                      "22",
                      "23",
                      "24",
                    ].map((item, key) => (
                      <option key={key} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-3">
                  <label htmlFor="inputState" className="form-label">
                    Humidity
                  </label>
                  <select
                    onChange={(e) => setHumidity(e.target.value)}
                    id="inputState"
                    className="form-select"
                  >
                    <option selected="">Select</option>
                    {[
                      "10",
                      "20",
                      "30",
                      "40",
                      "50",
                      "60",
                      "70",
                      "80",
                      "90",
                      "100",
                    ].map((item, key) => (
                      <option key={key} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-3">
                  <label htmlFor="inputState" className="form-label">
                    Water Every
                  </label>
                  <select
                    onChange={(e) => setWaterEvery(e.target.value)}
                    id="inputState"
                    className="form-select"
                  >
                    <option selected="">Select</option>
                    {[
                      "24",
                      "48",
                      "72",
                      "96",
                      "120",
                      "144",
                      "168",
                      "192",
                      "216",
                      "240",
                    ].map((item, key) => (
                      <option key={key} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-3">
                  <label htmlFor="inputState" className="form-label">
                    Rating
                  </label>
                  <select
                    onChange={(e) => setRating(e.target.value)}
                    id="inputState"
                    className="form-select"
                  >
                    <option selected="">Select</option>
                    {[1, 2, 3, 4, 5].map((item, key) => (
                      <option key={key} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-12">
                  <label htmlFor="inputAddress" className="form-label">
                    Unit
                  </label>
                  <input
                    onKeyUp={(e) => setUnit(e.target.value)}
                    type="number"
                    className="form-control"
                    id="inputAddress"
                    placeholder="Enter Units Available"
                    min={1}
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="inputAddress" className="form-label">
                    Img Url
                  </label>
                  <input
                    onKeyUp={(e) => setImgUrl(e.target.value)}
                    type="text"
                    className="form-control"
                    id="inputAddress"
                    placeholder="Enter Img Url"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={() => handleSubmit()}
                className="btn btn-primary"
              >
                {isAdding ? "Adding Product..." : "Add Now"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
