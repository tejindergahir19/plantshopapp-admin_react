import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

import { db } from "../firebase";
import {
    getDocs,
    collection,
} from "firebase/firestore";

function CustomerPage() {

    const [userList, setUserList] = useState(null);
    const [tmpUserList, setTmpUserList] = useState(null);

    const fetchUsers = async () => {
        setUserList(null);
        setTmpUserList(null);
        let tmpData = [];
        try {
            const querySnapshot = await getDocs(collection(db, "tbl_user"));
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

        setUserList(tmpData);
        setTmpUserList(tmpData);
    };


    
    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <div className="container-fluid m-0 p-0">
            <Navbar />
            <div className="container mt-4 p-3">
                <h2>Customers  {"(" + tmpUserList?.length + ")"}</h2>

               

                <div className="mt-5">
                    <table class="table">
                        <thead>
                            <tr class="table-light">
                                <th scope="col">NAME</th>
                                <th scope="col">EMAIL</th>
                                <th scope="col">PHONE</th>
                                <th scope="col">ADDRESS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (tmpUserList?.length == 0) &&
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
                                tmpUserList ?
                                    (
                                        tmpUserList?.map((item,key) => (
                                            <>
                                                <tr>
                                                    <td>{item?.data?.userName}</td>
                                                    <td>{item?.data?.userEmail}</td>
                                                    <td>{item?.data?.userPhone}</td>
                                                    <td>{item?.data?.userAddress}</td>
                                                </tr>
                                            </>
                                        ))
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
    );
}

export default CustomerPage;
