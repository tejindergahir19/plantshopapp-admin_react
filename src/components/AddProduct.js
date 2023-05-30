function AddProduct() {
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
                                    <input type="text" className="form-control" id="inputEmail4" placeholder="Enter Title" />
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="inputPassword4" className="form-label">
                                        Description
                                    </label>
                                    <input type="text" className="form-control" id="inputPassword4" placeholder="Enter Description" />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="inputPassword4" className="form-label">
                                        Category
                                    </label>
                                    <input type="text" className="form-control" id="inputPassword4" placeholder="Enter Category" />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="inputPassword4" className="form-label">
                                        Price
                                    </label>
                                    <input type="number" min="1" placeholder="Enter Price"  className="form-control" id="inputPassword4" />
                                </div>

                                
                                
                                <div className="col-md-6">
                                    <label htmlFor="inputState" className="form-label">
                                        Plant Type
                                    </label>
                                    <select id="inputState" className="form-select">
                                        <option selected="">Select</option>
                                        <option>...</option>
                                    </select>
                                </div>


                                <div className="col-md-6">
                                    <label htmlFor="inputState" className="form-label">
                                        Size
                                    </label>
                                    <select id="inputState" className="form-select">
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
                                    <select id="inputState" className="form-select">
                                        <option selected="">Select</option>
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
                                    <select id="inputState" className="form-select">
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
                                    <select id="inputState" className="form-select">
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
                                    <select id="inputState" className="form-select">
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
                                        type="text"
                                        className="form-control"
                                        id="inputAddress"
                                        placeholder="Enter Img Url" 
                                    />
                                </div>
                              
                            </form>

                        </div>
                        <div className="modal-footer">

                            <button type="button" className="btn btn-primary">
                                Add Product
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default AddProduct;