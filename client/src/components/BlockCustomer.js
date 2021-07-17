import React from "react";
import { Button } from "@material-ui/core";

const BlockCustomer = ({ id, customers, setCustomers }) => {
  const blockCustomer = async () => {
    console.log("INSIDE -> unblockCustomer");
    try {
      const res = await fetch(
        `http://localhost:5000/api/customer/block/${id}`,
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
            customer.customer_isblocked = true;
            console.log(customer);
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
      <Button variant="outlined" color="secondary" onClick={blockCustomer}>
        Block
      </Button>
    </>
  );
};

export default BlockCustomer;
