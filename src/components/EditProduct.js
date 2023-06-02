import { useEffect, useState } from "react";

import { db } from "../firebase";
import { getDocs, collection,doc,updateDoc } from "firebase/firestore";

function EditProduct(props) {
    const { productId, modalID, data } = props;

    const [isAdding, setIsAdding] = useState(false);

    const [categories, setCategories] = useState(null);


    const [title, setTitle] = useState(data?.title);
    const [desc, setDesc] = useState(data?.description);
    const [category, setCategory] = useState(data?.category);
    const [price, setPrice] = useState(data?.price);
    const [plantType, setPlantType] = useState(data?.plantType);
    const [size, setSize] = useState(data?.size);
    const [height, setHeight] = useState(data?.height);
    const [humidity, setHumidity] = useState(data?.humidity);
    const [waterEvery, setWaterEvery] = useState(data?.waterEvery);
    const [rating, setRating] = useState(data?.rating);
    const [unit, setUnit] = useState(data?.unit);
    const [imgUrl, setImgUrl] = useState(data?.img);

    const handleSubmit = async () => {
        setIsAdding(true);
console.clear()

        try {
            // Add a new document with a generated id.
            const docRef = await updateDoc(doc(db, "tbl_plant_data", productId), {
                title: title,
                category: category, currency: "₹",
                description: desc,
                height: height,
                humidity: humidity,
                img: imgUrl,
                plantType: plantType,
                price: price,
                rating: rating,
                size: size,
                unit: unit,
                waterEvery: waterEvery
            });
            alert("Product Updated !");
            window.location.replace("./product");
           
        } catch (error) {
            console.log(error)
            alert("Unable to update product at this moment !")
        }
        setIsAdding(false);

    }

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
                id={modalID}
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered ">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                Edit Product
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
                                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="form-control" id="inputEmail4" placeholder="Enter Title" />
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="inputPassword4" className="form-label">
                                        Description
                                    </label>
                                    <input value={desc} type="text" onChange={(e) => setDesc(e.target.value)} className="form-control" id="inputPassword4" placeholder="Enter Description" />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="inputPassword4" className="form-label">
                                        Category
                                    </label>
                                    <input value={category} type="text" onChange={(e) => setCategory(e.target.value)} className="form-control" id="inputPassword4" placeholder="Enter Category" />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="inputPassword4" className="form-label">
                                        Price
                                    </label>
                                    <input value={price} type="number" onChange={(e) => setPrice(e.target.value)} min="1" placeholder="Enter Price" className="form-control" id="inputPassword4" />
                                </div>



                                <div className="col-md-6">
                                    <label htmlFor="inputState" className="form-label">
                                        Plant Type
                                    </label>
                                    <select onChange={(e) => setPlantType(e.target.value)} id="inputState" className="form-select">
                                        {
                                            categories?.map((item, key) => (
                                                (item.data == plantType) ?
                                                    (<option key={key} value={item.data} selected>{item.data.toUpperCase()}</option>) :
                                                    (
                                                        <option key={key} value={item.data}>{item.data.toUpperCase()}</option>
                                                    )
                                            ))
                                        }
                                    </select>
                                </div>


                                <div className="col-md-6">
                                    <label htmlFor="inputState" className="form-label">
                                        Size
                                    </label>
                                    <select onChange={(e) => setSize(e.target.value)} id="inputState" className="form-select">

                                        {
                                            ["small", "medium", "large"].map((item, key)=>(
                                                (size == item) ?
                                                    (
                                                        <option key={key} selected value={item}>{item.toUpperCase()}</option>
                                                    ) :
                                                    (
                                                        <option key={key} value={item}>{item.toUpperCase()}</option>
                                                    )
                                            ))
                                    }

                                    </select>
                                </div>

                                <div className="col-md-3">
                                    <label htmlFor="inputState" className="form-label">
                                        Height
                                    </label>
                                    <select onChange={(e) => setHeight(e.target.value)} id="inputState" className="form-select">
                                        
                                        {
                                            ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'].map((item, key) => (
                                                (height == item) ?
                                                    (
                                                        <option key={key} selected value={item}>{item}</option>
                                                    ) :
                                                    (
                                                        <option key={key} value={item}>{item}</option>
                                                    )
                                            ))
                                        }

                                    </select>
                                </div>

                                <div className="col-md-3">
                                    <label htmlFor="inputState" className="form-label">
                                        Humidity
                                    </label>
                                    <select onChange={(e) => setHumidity(e.target.value)} id="inputState" className="form-select">
                                        
                                        {
                                            ["10", "20", "30", "40", "50", "60", "70", "80", "90", "100"].map((item, key) => (
                                                (humidity == item) ?
                                                    (
                                                        <option key={key} selected value={item}>{item}</option>
                                                    ) :
                                                    (
                                                        <option key={key} value={item}>{item}</option>
                                                    )
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className="col-md-3">
                                    <label htmlFor="inputState" className="form-label">
                                        Water Every
                                    </label>
                                    <select onChange={(e) => setWaterEvery(e.target.value)} id="inputState" className="form-select">
                                        
                                        {
                                            ["24", "48", "72", "96", "120", "144", "168", "192", "216", "240"].map((item, key) => (
                                                (waterEvery == item) ?
                                                    (
                                                        <option key={key} selected value={item}>{item}</option>
                                                    ) :
                                                    (
                                                        <option key={key} value={item}>{item}</option>
                                                    )
                                            ))
                                        }
                               
                                    </select>
                                </div>

                                <div className="col-md-3">
                                    <label htmlFor="inputState" className="form-label">
                                        Rating
                                    </label>
                                    <select onChange={(e) => setRating(e.target.value)} id="inputState" className="form-select">
                                       
                                        {
                                            [1, 2, 3, 4,5].map((item, key) => (
                                                (rating == item) ?
                                                    (
                                                        <option key={key} selected value={item}>{item}</option>
                                                    ) :
                                                    (
                                                        <option key={key} value={item}>{item}</option>
                                                    )
                                            ))
                                        }
                                       
                                    </select>
                                </div>

                                <div className="col-12">
                                    <label htmlFor="inputAddress" className="form-label">
                                        Unit
                                    </label>
                                    <input
                                        onChange={(e) => setUnit(e.target.value)}
                                        type="number"
                                        className="form-control"
                                        id="inputAddress"
                                        placeholder="Enter Units Available"
                                        value={unit}
                                        min={0}
                                    />
                                </div>



                                <div className="col-12">
                                    <label htmlFor="inputAddress" className="form-label">
                                        Img Url
                                    </label>
                                    <input
                                        value={imgUrl}
                                        onChange={(e) => setImgUrl(e.target.value)}
                                        type="text"
                                        className="form-control"
                                        id="inputAddress"
                                        placeholder="Enter Img Url"
                                    />
                                </div>

                            </form>

                        </div>
                        <div className="modal-footer">

                            <button type="button" onClick={() => handleSubmit()} className="btn btn-primary">
                                {
                                    isAdding ? "Updating Product..." : "Update Now"
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default EditProduct;