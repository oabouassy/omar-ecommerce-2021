import Header from "./Header";
import Products from "./HomeProductSection";
import { Container } from "@material-ui/core";

const Home = () => {
  return (
    <>
      <Header />
      <Products page="1" />
    </>
  );
};

export default Home;
