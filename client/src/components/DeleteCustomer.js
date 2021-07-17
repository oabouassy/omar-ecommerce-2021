import React from "react";
import { Button } from "@material-ui/core";

const DeleteCustomer = ({ customers, setCustomers, id }) => {
  const deleteAccount = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/customer/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      const data = await res.json();
      if (data.deleted) {
        const filtered = customers.filter(
          (customer) => customer.customer_id !== id
        );
        setCustomers(filtered);
      }
    } catch (error) {
      console.error("ERROR While deleting customer account", error.message);
    }
  };
  return (
    <>
      <Button variant="contained" color="secondary" onClick={deleteAccount}>
        Delete
      </Button>
    </>
  );
};

export default DeleteCustomer;
