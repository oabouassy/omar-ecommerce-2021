import { useContext } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import cartTotalPriceContext from "../../context/cartTotalPrice";
import "./stripe.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CheckoutForm = () => {
  const [cartTotalPrice] = useContext(cartTotalPriceContext);
  const stripe = useStripe();
  const elements = useElements();

  // options for toastify
  const errorOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
  const successOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
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
        console.log(data);
        if (data.success) {
          toast.success("Payment successful !", successOptions);
        }
      } catch (error) {
        console.log("ERROR | ", error.message);
      }
    } else {
      toast.error(error.message, errorOptions);
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
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: "35rem", width: "100%", margin: "auto" }}
      id="payment-form"
    >
      <ToastContainer />
      <CardElement options={cardStyle} />
      <button className="stripeButton">Pay</button>
    </form>
  );
};

export default CheckoutForm;
