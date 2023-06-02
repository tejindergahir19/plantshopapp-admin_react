import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

import { db } from "../firebase";
import { getDocs, collection } from "firebase/firestore";

import COLORS from "../constant/COLORS";
import AddProduct from "../components/AddProduct";
import EditProduct from "../components/EditProduct";

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

            <td width="75px">
                <button data-bs-toggle="modal"
                data-bs-target={"#tj"+product?.id} type="button" className="btn btn-success ms-1" >
                    Edit
                </button>
        
                <EditProduct data={product?.data} productId={product?.id} modalID={"tj"+product?.id} />
            </td>
        </tr>
    );
}

function ProductPage() {
    const [products, setProducts] = useState(null);

    const [tmpPlantData, setTmpPlantData] = useState(null);

    const fetchProducts = async () => {
        setProducts(null);
        setTmpPlantData(null);
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
                <h2>Products {"("+tmpPlantData?.length+")"}</h2>

                <div>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"

                    }}>
                        <div
                            className="input-group mb-3 mt-4"
                            style={{
                                width: "343px",
                            }}


                        >
                            <input
                                type="search"
                                className="form-control"
                                placeholder="Search..."
                                aria-label="Username"
                                aria-describedby="basic-addon1"

                                onChange={(e) => handleSearch(e.target.value, products)}
                            />
                        </div>

                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <input class="form-check-input" type="checkbox" value="1" id="flexCheckDefault" onChange={
                                (e)=>{
                                    e.target.checked ?
                                    (
                                        setTmpPlantData(
                                            products.filter((item)=>(
                                                Number(item?.data?.unit == 0)
                                            ))
                                        )
                                    ) : setTmpPlantData(products)
                                }
                            }></input>
                            <span className="text-danger ms-2 mt-1 fw-bolder">Out of Stock</span>


                            <button type="button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal" className="btn btn-primary ms-4">Add Product</button>

                <AddProduct />
                        </div>
                    </div>

                    <div className="mt-2">
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
                                    (tmpPlantData?.length == 0) &&
                                    (
                                        <tr>
                                            <td className='text-danger' colspan="6">
                                                <center>
                                                    No records found !
                                                </center>
                                            </td>
                                        </tr>
                                    )
                                }

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
                                                            <span class="sr-only"></span>
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
