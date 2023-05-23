import Navbar from "../components/Navbar";


function ProductPage() {
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
            />
          </div>

          <div className="mt-4">
            <table class="table">
              <thead>
                <tr class="table-dark">
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col">PRODUCT NAME</th>
                  <th scope="col">PRICE</th>
                  <th scope="col">CATEGORY</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>
                  <img src="..." alt="product" width="200px" height="200px" />
                  </td>
                  <td>name</td>
                  <td>price</td>
                  <td>category</td>
                  <td>
                    <button type="button" className="btn btn-success">Edit</button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td colspan="2">Larry the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
