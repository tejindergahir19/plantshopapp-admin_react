import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

import { db } from "../firebase";
import { getDocs, collection } from "firebase/firestore";

import COLORS from "../constant/COLORS";
import OrderDetail from "../components/OrderDetail";

const getStatusBgColor = (status) => {
    switch (status.toLowerCase()) {
        case "delivered":
        case "accepted":
            return COLORS.primary;

        case "out for delivery":
            return COLORS.orange;

        case "cancelled":
            return COLORS.red;

        default:
            return COLORS.caption;
    }
};

function OrderTableList(props) {
    const { order, key } = props;
    return (
        <tr>
            <td>
                <span className="text-success">
                    {order?.id}
                </span>
            </td>
            <td  >
                {order?.data?.date}
            </td>
            <td>
                {order?.data?.time}
            </td>
            <td style={{
                fontWeight: "bold",
                color: COLORS.primary,
                fontSize: "24px"
            }}>
                {order?.data?.subTotal + order?.data?.delivery} ₹
            </td>

            <td style={{
                textTransform: "capitalize",
                color: getStatusBgColor(order?.data?.status)
            }} width="175px">
                {order?.data?.status}
            </td>

            <td width="75px">
                <button data-bs-toggle="modal"
                    data-bs-target={"#" + "tj" + order.id} className="btn btn-success">View</button>
                <OrderDetail orderId={order.id} modalId={"tj" + order.id} data={order?.data} userId={order?.data?.userId} />
            </td>
        </tr>
    );
}

function OrderPage() {
    const [orders, setOrders] = useState(null);

    const [tmpOrders, setTmpOrders] = useState(null);

    const fetchOrders = async () => {
        setOrders(null);
        setTmpOrders(null);
        let tmpData = [];
        try {
            const querySnapshot = await getDocs(collection(db, "tbl_orders"));
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
        console.clear()
        console.log(tmpData)
        setOrders(tmpData);
        setTmpOrders(tmpData);
    };

    const handleSearch = (search, orders) => {
        search != ""
            ? setTmpOrders(
                orders.filter(
                    (item) =>
                        item?.data?.status
                            .toLowerCase()
                            .includes(search.toLowerCase())
                )
            )
            : setTmpOrders(orders);
    };

    useEffect(() => {
        fetchOrders()
    }, []);

    return (
        <div className="container-fluid m-0 p-0">
            <Navbar />

            <div className="container mt-4 p-3">
                <h2>Orders  {"("+tmpOrders?.length+")"}</h2>

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
                            <select onChange={(e) => handleSearch(e.target.value, orders)} className="form-select" aria-label="Default select example">
                            <option value="" selected>Apply Filter</option>
                                <option value="pending" >Pending</option>
                                <option value="accepted">Accept</option>
                                <option value="processing">Process</option>
                                <option value="out for delivery">Out For Delivery</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancel</option>
                            </select>


                         
                        </div>
                    </div>

                    <div className="mt-2">
                        <table class="table">
                            <thead>
                                <tr class="table-light">
                                    <th scope="col">Order ID</th>
                                    <th scope="col">Date</th>
                                    <th>Time</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (tmpOrders?.length == 0) &&
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
                                    tmpOrders ?
                                        (
                                            tmpOrders?.map((item) => <OrderTableList order={item} key={item.id} />)
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

export default OrderPage;
