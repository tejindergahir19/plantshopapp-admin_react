import React, { useState } from "react";
import COLORS from "../constant/COLORS";

import { db } from "../firebase";
import {
  getDocs,
  query,
  where,
  collection
} from "firebase/firestore";

function LoginPage() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const [showPassword, setShowPassword] = useState(false);

  const authLogin = async () => {
    if (username != null && password != null) {
      try {
        const q = query(
          collection(db, "tbl_admin"),
          where("username", "==", username?.toLowerCase())
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot?.docs?.length == 0) {
          alert("Invalid Username !");
        } else {
          if (querySnapshot?.docs[0]?.data()?.password == password) {
            alert("Login Success !");
          } else {
            alert("Invalid Password !");
          }
        }
      } catch (error) {
        console.log("Error getting admin detail");
      }
    } else {
      alert("All fields required !");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="container-fluid p-0 m-0"
    >
      <div
        className="p-4"
        style={{
          width: "420px",
          border: "1px solid lightgrey",
          borderRadius: "6px",
        }}
      >
        <form>
          <div className="mb-3">
            <h2
              style={{
                color: COLORS.primary,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Welcome to PlantShop
            </h2>

            <h4
              className="mt-3"
              style={{
                textAlign: "center",
                color: COLORS.caption,
              }}
            >
              Admin Login
            </h4>
          </div>
          <div className="mb-3 ">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Username
            </label>
            <input
              onKeyUp={(e) => setUsername(e.target.value)}
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Username"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              onKeyUp={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Password"
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
              onChange={() =>
                showPassword ? setShowPassword(false) : setShowPassword(true)
              }
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Show Password
            </label>
          </div>
          <button
            type="button"
            style={{
              width: "100%",
              background: COLORS.primary,
              color: COLORS.white,
            }}
            onClick={() => authLogin()}
            className="btn mt-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
