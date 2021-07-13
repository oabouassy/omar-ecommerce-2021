import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const PUBLIC_KEY =
  "pk_test_51IQUqVGA0GVc6EwMHDjlQegyWEXGG5zuAu0pzGBAdy21gptwyTjCd5A8P00cG6GUA2XeaV6u2uvVZCQfpESIb2kd00PIqeps6w";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const Stripe = () => {
  return (
    <Elements stripe={stripeTestPromise}>
      <CheckoutForm />
    </Elements>
  );
};
export default Stripe;
