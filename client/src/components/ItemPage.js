import React from "react";

const ItemPage = (props) => {
  const productID = props.match.params.productID;
  return (
    <h3>
      Product ID {`=>`} {productID}
    </h3>
  );
};

export default ItemPage;
