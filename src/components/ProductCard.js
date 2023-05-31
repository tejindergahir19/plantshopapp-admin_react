import { useEffect,useState} from "react";
import COLORS from "../constant/COLORS";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

function ProductCard(props){
    const {item} = props;

    const [value, setValue] = useState(null);

    const fetchPlantData = async () => {
        let querySnapshot;
        try {
          querySnapshot = await getDoc(doc(db, "tbl_plant_data", item?.productId));
        } catch (error) {
          console.error("Error fetching data: ", error);
          return;
        }
        setValue(querySnapshot.data());
      };
    
      useEffect(() => {
        fetchPlantData();
      }, []);

      
    return(
        <div className="mx-2 my-2 mb-1 p-2 py-3 row" style={{
            background:COLORS.grey,
            borderRadius:"6px",
            width:"465px"
        }} >
            <div className="col-2 me-1">
                <img src={value?.img}  style={{ width: "54px", height: "50px" }} />
            </div>
            <div className="col">
                <span className="d-block fw-bolder fs-6">{value?.title}</span>
                <span className="fw-semibold text-success fs-6">{value?.price} ₹</span>
            </div>
            <div className="col-2 d-flex justify-content-center align-items-center">
                <span className="fw-bolder me-2 fs-5">X</span>
                <span className="fw-semibold text-success fs-5">{item?.quantity}</span>
            </div>
        </div>

    )
}

export default ProductCard;