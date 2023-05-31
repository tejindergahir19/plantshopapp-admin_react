import { useEffect, useState } from "react";

function OrderDetail(props) {

    const { modalId, data } = props;

    console.log(modalId)

    const [isUpdating, setIsUpdating] = useState(false);

    const handleSubmit = async () => {
        setIsUpdating(true);

        setIsUpdating(false);
    }

    useEffect(() => {

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
                <div className="modal-dialog modal-dialog-centered ">
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
                                    <select  style={{
                                                    height:"32px",
                                                    width:"232px",
                                                    border:"1px solid lightgrey",
                                                    outline:"none",
                                                    padding:"4px 8px",
                                                    borderRadius:"6px"
                                                }} id="inputState" className="form-select">
                                        <option value="pending">Pending</option>
                                        <option value="accepted">Accept</option>
                                        <option value="processing">Process</option>
                                        <option value="out for delivery">Out For Delivery</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="cancelled">Cancel</option>
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
                                                type="datetime-local"
                                                classname="form-control"
                                                style={{
                                                    height:"32px",
                                                    border:"1px solid lightgrey",
                                                    outline:"none",
                                                    padding:"4px 8px",
                                                    borderRadius:"6px"
                                                }}
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
                                                    height:"32px",
                                                    width:"232px",
                                                    border:"1px solid lightgrey",
                                                    outline:"none",
                                                    padding:"4px 8px",
                                                    borderRadius:"6px"
                                                }}

                                                placeholder="Message"
                                            />
                                        </div>

                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">

                            {/* <button type="button" onClick={() => handleSubmit()} className="btn btn-primary">
                                {
                                    isAdding ? "Adding Product..." : "Add Now"
                                }
                            </button> */}
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default OrderDetail;