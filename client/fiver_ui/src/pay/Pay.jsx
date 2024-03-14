import React, { useEffect, useState } from "react";
import "./Pay.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";
import CheckoutForm from "../components/checkoutForm/CheckoutForm";
import newRequest from "../utils/newRequest";

const stripePromise = loadStripe(
  "pk_test_51Om99hBwETQT04KZSNWKbt9V69O4xTuJ78FLpLVuMc87gTavoTGDB5O9EkYWN8CQl6XLxxGQP4FDWbu0mvlsjEmu00Eevzqeje"
);

const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");
  const { id } = useParams();
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await newRequest.post(
          `/orders/create-payment-intent/${id}`
        );
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <div className="pay">
      <div className="container">
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default Pay;
