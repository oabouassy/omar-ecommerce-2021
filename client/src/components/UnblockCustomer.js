import React from "react";
import { Button } from "@material-ui/core";

const UnblockCustomer = ({ id, customers, setCustomers }) => {
  const unblockCustomer = async () => {
    console.log("INSIDE -> unblockCustomer");
    try {
      const res = await fetch(
        `http://localhost:5000/api/customer/unblock/${id}`,
        {
          method: "PUT",
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      const data = await res.json();
      if (!data.error) {
        const modifiedCustomers = customers.map((customer) => {
          if (customer.customer_id === id) {
            customer.customer_isblocked = false;
            return customer;
          } else {
            return customer;
          }
        });
        setCustomers(modifiedCustomers);
      }
    } catch (error) {
      console.error("ERROR While unblocking customer account", error.message);
    }
  };
  return (
    <>
      <Button variant="contained" color="primary" onClick={unblockCustomer}>
        Unblock
      </Button>
    </>
  );
};

export default UnblockCustomer;
