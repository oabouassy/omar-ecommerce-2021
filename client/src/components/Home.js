import Header from "./Header";
import Products from "./HomeProductSection";
import { Container } from "@material-ui/core";

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
