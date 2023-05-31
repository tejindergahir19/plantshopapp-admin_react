import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
    getDocs, doc, updateDoc,
    query,
    where,
    collection,
} from "firebase/firestore";

import ProductCard from "./ProductCard";

function OrderDetail(props) {

    const { modalId, data, userId,orderId} = props;
    const [isUpdating, setIsUpdating] = useState(false);

    const [userContactDetails, setUserContactDetails] = useState(null);


    const [orderStatus, setOrderStatus] = useState(data?.status);
    const [deliverBy, setDeliverBy] = useState(data?.deliveryBy);
    const [msg, setMsg] = useState(data?.msg);


    const handleSubmit = async () => {
        setIsUpdating(true);

        try {
            // Add a new document with a generated id.
            const docRef = await updateDoc(doc(db, "tbl_orders", orderId), {
                status:orderStatus,
           deliveryBy:deliverBy,
                msg:msg
            });
            alert("Order Status Updated !");
            window.location.replace("./order");

        } catch (error) {
            console.log(error)
            alert("Unable to update order at this moment !")
        }
        setIsUpdating(false);
    }


    const getUserContactDetails = async () => {
        console.clear()
        console.log("user details")
        setUserContactDetails(null);
        try {
            const q = query(
                collection(db, "tbl_user"),
                where("userId", "==", userId)
            );
            const querySnapshot = await getDocs(q);

            const data = querySnapshot.docs[0].data();

            setUserContactDetails(
                {
                    name: data.userName,
                    phone: data.userPhone,
                    address: data.userAddress
                }
            )
        } catch (error) {
            console.error("Error checking user: ", error);
        }
    }

    useEffect(() => {
        getUserContactDetails()
    }, []);

    return (
        <>
            <div
                className="modal fade"
                id={modalId}
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered ">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                Order Details
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <div className="row g-3">
                                <div className="col my-3 d-flex justify-content-between aling-items-center">
                                    <span className="fw-bold">Order Id</span>
                                    <span className="text-success">{modalId}</span>
                                </div>
                            </div>
                            <div className="row g-3">
                                <div className="col my-2 d-flex justify-content-between aling-items-center">
                                    <span className="fw-bold">Order Date</span>
                                    <span className="text-success">{data?.date} | {data?.time}</span>
                                </div>
                            </div>
                            <hr />
                            <div className="row g-3">
                                {
                                    data?.items.map((item, key) => (
                                        <ProductCard key={key} item={item} />
                                    ))
                                }
                            </div>
                            <hr />
                            <div className="row g-3">
                                <div className="col my-3 d-flex justify-content-between aling-items-center">
                                    <span className="text-secondary">Sub total</span>
                                    <span className="text-secondary fw-bold">{data?.subTotal} ₹</span>
                                </div>
                            </div>
                            <div className="row g-3">
                                <div className="col my-2 d-flex justify-content-between aling-items-center">
                                    <span className="text-secondary">Delivery</span>
                                    <span className="text-secondary fw-bold">{data?.delivery} ₹</span>
                                </div>
                            </div>

                            <hr />
                            <div className="row g-3">
                                <div className="col my-3 d-flex justify-content-between aling-items-center">
                                    <span className="text-secondary fs-4 fw-bold">Total</span>
                                    <span className="text-success fs-4 fw-bold">{data?.subTotal + data?.delivery} ₹</span>
                                </div>
                            </div>
                            <hr />
                            <div className="row g-3">
                                <div className="col my-3 d-flex justify-content-between aling-items-center">
                                    <span className="fw-bold">Order Status</span>
                                    <span className="text-success">
                                        <select style={{
                                            height: "32px",
                                            width: "235px",
                                            border: "1px solid lightgrey",
                                            outline: "none",
                                            padding: "4px 8px",
                                            borderRadius: "6px"
                                        }} id="inputState" onChange={(e)=>setOrderStatus(e.target.value)} className="form-select">
                                            {
                                                [{
                                                    name: "Pending",
                                                    value: "pending"
                                                }, {
                                                    name: "Accept",
                                                    value: "accepted"
                                                }, {
                                                    name: "Process",
                                                    value: "processing"
                                                }, {
                                                    name: "Out For Delivery",
                                                    value: "out for delivery"
                                                }, {
                                                    name: "Delivered",
                                                    value: "delivered"
                                                }, {
                                                    name: "Cancel",
                                                    value: "cancelled"
                                                },
                                                ].map((item, key) => (
                                                    (item?.value == orderStatus.toLowerCase()) ?
                                                        (
                                                            <option selected key={key} value={item?.value}>{item?.name}</option>
                                                        ) :
                                                        (
                                                            <option key={key} value={item?.value}>{item?.name}</option>
                                                        )

                                                ))

                                            }


                                        </select></span>
                                </div>
                            </div>
                            <div className="row g-3">
                                <div className="col my-3 d-flex justify-content-between aling-items-center">
                                    <span className="fw-bold">Payment Type</span>
                                    <span className="text-success">Cash / Pay on Delivery</span>
                                </div>
                            </div>
                            <div className="row g-3">
                                <div className="col my-3 d-flex justify-content-between aling-items-center">
                                    <span className="fw-bold">DeliverBy</span>
                                    <span className="text-success">
                                        <div classname="input-group">
                                            <input
                                                type="date"
                                                classname="form-control"
                                                style={{
                                                    height: "32px",
                                                    width: "235px",
                                                    border: "1px solid lightgrey",
                                                    outline: "none",
                                                    padding: "4px 8px",
                                                    borderRadius: "6px"
                                                }}

                                                value={deliverBy}

                                                onChange={(e) => setDeliverBy(e.target.value)}
                                            />
                                        </div>

                                    </span>
                                </div>
                            </div>

                            <div className="row g-3">
                                <div className="col my-3 d-flex justify-content-between aling-items-center">
                                    <span className="fw-bold">Message</span>
                                    <span className="text-success">
                                        <div classname="input-group">
                                            <input
                                                type="text"
                                                classname="form-control"

                                                style={{
                                                    height: "32px",
                                                    width: "235px",
                                                    border: "1px solid lightgrey",
                                                    outline: "none",
                                                    padding: "4px 8px",
                                                    borderRadius: "6px"
                                                }}

                                                value={msg}

                                                onChange={(e) => setMsg(e.target.value)}

                                                placeholder="Message"
                                            />
                                        </div>

                                    </span>
                                </div>
                            </div>
                            <hr />
                            <div className="row g-3">
                                <div className="col my-3 ">
                                    <span className="fw-bold d-block">Contact Details</span>
                                    <span className="text-secondary d-block">
                                        {
                                            userContactDetails ?
                                                (
                                                    <>
                                                        <span className="d-block">{userContactDetails?.name}</span>
                                                        <span className="d-block">{userContactDetails?.address}</span>
                                                        <span className="d-block" ><span className="fw-bold">Phone : </span>{userContactDetails?.phone}</span>
                                                    </>
                                                ) :
                                                (
                                                    <center>
                                                        <div className="mt-4 spinner-border text-success" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                    </center>

                                                )
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">

                            <button type="button" onClick={() => handleSubmit()} className="btn btn-primary">
                                {
                                    isUpdating ? "Updating Product..." : "Update Now"
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default OrderDetail;