import { useEffect, useState } from "react";
import Header from "./Header";
import Products from "./HomeProductSection";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

// STYLING
const useStyles = makeStyles((theme) => ({
  //
}));

const Home = () => {
  return (
    <>
      <Container>
        <Header />
        <Products page="1" />
      </Container>
    </>
  );
};

export default Home;
