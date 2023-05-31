import { useEffect, useState } from "react";

import { db } from "../firebase";
import { getDocs, collection, addDoc } from "firebase/firestore";

function EditProduct(props) {
    const { productId, modalID, data } = props;

    console.clear()
    console.log(productId)

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
        console.log(title, desc, category, price, plantType, size, height, humidity, waterEvery, rating, unit, imgUrl);

        // try {
        //     // Add a new document with a generated id.
        //     const docRef = await addDoc(collection(db, "tbl_plant_data"), {
        //         title: title,
        //         category: category, currency: "₹",
        //         description: desc,
        //         height: height,
        //         humidity: humidity,
        //         img: imgUrl,
        //         plantType: plantType,
        //         price: price,
        //         rating: rating,
        //         size: size,
        //         unit: unit,
        //         waterEvery: waterEvery
        //     });
        //     alert("Product Added !");
        //     window.location.replace("./product");
        //     console.log("Document written with ID: ", docRef.id);
        // } catch (error) {
        //     alert("Unable to add product at this moment !")
        // }


    }

    const fetchProductDetails = async () => {

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
                                    <input value={category} type="text" onChang={(e) => setCategory(e.target.value)} className="form-control" id="inputPassword4" placeholder="Enter Category" />
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
                                        <option >Select</option>
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
                                        ["small","medium","large"].map((item,key)=>(
                                            <option value={item} style={{
                                                textTransform
                                            }}>{item}</option>
                                        ))
                                    }
                                        
                                        <option {(size) == "small" && "selected"} value="small">Small</option>
                                        <option value="medium">Medium</option>
                                        
                                    </select>
                                </div>

                                <div className="col-md-3">
                                    <label htmlFor="inputState" className="form-label">
                                        Height
                                    </label>
                                    <select onChange={(e) => setHeight(e.target.value)} id="inputState" className="form-select">
                                        <option >Select</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                        <option value="13">13</option>
                                        <option value="14">14</option>
                                        <option value="15">15</option>
                                        <option value="16">16</option>
                                        <option value="17">17</option>
                                        <option value="18">18</option>
                                        <option value="19">19</option>
                                        <option value="20">20</option>
                                        <option value="21">21</option>
                                        <option value="22">22</option>
                                        <option value="23">23</option>
                                        <option value="24">24</option>
                                    </select>
                                </div>

                                <div className="col-md-3">
                                    <label htmlFor="inputState" className="form-label">
                                        Humidity
                                    </label>
                                    <select onChange={(e) => setHumidity(e.target.value)} id="inputState" className="form-select">
                                        <option selected="">Select</option>
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                        <option value="30">30</option>
                                        <option value="40">40</option>
                                        <option value="50">50</option>
                                        <option value="60">60</option>
                                        <option value="70">70</option>
                                        <option value="80">80</option>
                                        <option value="90">90</option>
                                        <option value="100">100</option>
                                    </select>
                                </div>

                                <div className="col-md-3">
                                    <label htmlFor="inputState" className="form-label">
                                        Water Every
                                    </label>
                                    <select onChange={(e) => setWaterEvery(e.target.value)} id="inputState" className="form-select">
                                        <option selected="">Select</option>
                                        <option value="30">30</option>
                                        <option value="60">60</option>
                                        <option value="90">90</option>
                                        <option value="120">120</option>
                                        <option value="150">150</option>
                                        <option value="180">180</option>
                                        <option value="210">210</option>
                                        <option value="240">240</option>
                                    </select>
                                </div>

                                <div className="col-md-3">
                                    <label htmlFor="inputState" className="form-label">
                                        Rating
                                    </label>
                                    <select onChange={(e) => setRating(e.target.value)} id="inputState" className="form-select">
                                        <option selected="">Select</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
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
                                        min={1}
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

                            <button type="button" onClick={()=>handleSubmit()} className="btn btn-primary">
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