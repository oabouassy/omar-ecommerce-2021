import { useContext } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import cartTotalPriceContext from "../../context/cartTotalPrice";
import "./stripe.css";

const CheckoutForm = () => {
  const [cartTotalPrice] = useContext(cartTotalPriceContext);
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
      console.log("token generated!", paymentMethod);
      try {
        const { id } = paymentMethod;
        const res = await fetch("http://localhost:5000/api/stripe/charge", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
          body: JSON.stringify({ amount: cartTotalPrice * 100, id }),
        });
        const data = await res.json();
        console.log("data", data.success);
        if (data.success) {
          console.log("data.success => ", "payment successful!");
        }
      } catch (error) {
        console.log("ERROR | ", error);
      }
    } else {
      console.log(error.message);
    }
  };
  // STYLING
  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }} id="payment-form">
      <CardElement options={cardStyle} />
      <button className="stripeButton">Pay</button>
    </form>
  );
};

export default CheckoutForm;
