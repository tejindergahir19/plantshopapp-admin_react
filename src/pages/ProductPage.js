import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

import { db } from "../firebase";
import { getDocs, collection } from "firebase/firestore";

import COLORS from "../constant/COLORS";

function ProductTableList(props) {
    const { product, key } = props;

    return (
        <tr>
            <td width="180px">
                <img src={product?.data?.img} alt="product" width="150px" height="150px" />
            </td>
            <td>
                <h5>{product?.data?.title}</h5>
                <p>{product?.data?.description}</p>
                {
                    (Number(product?.data?.unit) == 0) && <button type="button" class="btn btn-sm btn-outline-danger">Out of Stock</button>
                }
            </td>
            <td width="180px" style={{
                fontWeight: "bold",
                fontSize: "18px",
                textTransform: "capitalize"
            }}>
                {product?.data?.plantType}
            </td>
            <td style={{
                fontSize: "18px",
                fontWeight: "bold"
            }}>
                {
                    product?.data?.unit
                }
            </td>
            <td width="130px" style={{
                fontWeight: "bold",
                color: COLORS.primary,
                fontSize: "24px"
            }}>{product?.data?.price} {product?.data?.currency}</td>

            <td width="220px">
                <button type="button" className="btn btn-primary">
                    View
                </button>
                <button type="button" className="btn btn-success ms-1">
                    Edit
                </button>

                <button type="button" className="btn btn-danger ms-1">
                    Delete
                </button>
            </td>
        </tr>
    );
}

function ProductPage() {
    const [products, setProducts] = useState(null);

    const [tmpPlantData, setTmpPlantData] = useState(null);

    const fetchProducts = async () => {
        let tmpData = [];
        try {
            const querySnapshot = await getDocs(collection(db, "tbl_plant_data"));
            querySnapshot.forEach((doc) => {
                tmpData.push({
                    id: doc.id,
                    data: doc.data(),
                });
            });

            console.log(tmpData);
        } catch (error) {
            console.log("Unable to fetch products " + error);
        }

        setProducts(tmpData);
        setTmpPlantData(tmpData);
    };

    const handleSearch = (search, plantData) => {
        search != ""
            ? setTmpPlantData(
                plantData.filter(
                    (item) =>
                        item?.data?.category
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                        item?.data?.description
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                        item?.data?.plantType
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                        item?.data?.price.toLowerCase().includes(search.toLowerCase()) ||
                        item?.data?.size.toLowerCase().includes(search.toLowerCase()) ||
                        item?.data?.title.toLowerCase().includes(search.toLowerCase())
                )
            )
            : setTmpPlantData(plantData);

        console.log(tmpPlantData)
    };

    useEffect(() => {
        fetchProducts()
    }, []);

    return (
        <div className="container-fluid m-0 p-0">
            <Navbar />

            <div className="container mt-4 p-3">
                <h2>Products</h2>

                <div>
                    <div
                        className="input-group mb-3 mt-4"
                        style={{
                            width: "343px",
                        }}
                    >
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search..."
                            aria-label="Username"
                            aria-describedby="basic-addon1"

                            onKeyUp={(e) => handleSearch(e.target.value, products)}
                        />
                    </div>

                    <div className="mt-4">
                        <table class="table">
                            <thead>
                                <tr class="table-light">
                                    <th scope="col"></th>
                                    <th scope="col">PRODUCT NAME</th>
                                    <th scope="col">CATEGORY</th>
                                    <th scope="col">QUANTITY</th>
                                    <th scope="col">PRICE</th>

                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    tmpPlantData ?
                                        (
                                            tmpPlantData?.map((item) => <ProductTableList product={item} key={item.id} />)
                                        ) :
                                        (
                                            <tr>
                                                <td colspan="6">
                                                    <center>
                                                        <div class="spinner-border text-success" role="status">
                                                            <span class="sr-only">Loading...</span>
                                                        </div>
                                                    </center>
                                                </td>
                                            </tr>
                                        )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default ProductPage;
