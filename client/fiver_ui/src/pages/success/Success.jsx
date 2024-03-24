import React, { useEffect } from "react";
import newRequest from "../../utils/newRequest";
import { useLocation, useNavigate } from "react-router-dom";
import "./Success.scss";
const Success = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent");
  useEffect(() => {
    const makeRequest = async () => {
      try {
        await newRequest.put("/orders", { payment_intent });
        // setTimeout(() => {
        //   navigate("/orders");
        // }, 2000);
      } catch (err) {
        console.log(err);
      }
    };

    makeRequest();
  }, []);
  return (
    <div className="success">
      <p>
        Payment <span>successfully !!</span>. You are being redirected to the
        orders page. <br /> Please do not close the page
      </p>
    </div>
  );
};

export default Success;
