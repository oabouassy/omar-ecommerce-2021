import Header from "./Header";
import Products from "./HomeProductSection";

const Home = () => {
  return (
    <>
      <Header />
      <Products page="1" />
    </>
  );
};

export default Home;
