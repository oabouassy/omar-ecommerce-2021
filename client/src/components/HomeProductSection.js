import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Grid, Typography, Button } from "@material-ui/core";
import MyCard from "./Card";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import FilterByCategories from "./FilterByCategories";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
  },
  btn: {
    display: "block",
    margin: "auto",
    marginTop: "3rem",
  },
  noProducts: {
    marginTop: theme.spacing(3),
  },
  header: {
    marginBottom: "2rem",
    padding: "1rem",
    borderLeft: "6px solid #313f8c",
  },
}));

const Products = ({ page }) => {
  const classes = useStyles();
  let [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(page);
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    const res = await fetch(
      `http://localhost:5000/api/products/?page=${page}&limit=10`
    );
    const data = await res.json();
    setProducts(data.result);
  };

  const history = useHistory();
  const handlePageChange = () => {
    history.push(`/products/p/${++page}`);
    setCurrentPage(++page);
  };
  const displayProducts = () => {
    return products.map((product) => (
      <Grid item xs={12} sm={6} md={4} key={product.product_id}>
        <Link to={`/product/id/${product.product_id}`} className={classes.link}>
          <MyCard
            image={`http://localhost:5000${product.product_img_link}`}
            header={product.product_name}
            body={product.product_details}
          />
        </Link>
      </Grid>
    ));
  };
  return (
    <div>
      <Container>
        <Typography variant="h4" className={classes.header}>
          Recently Added
        </Typography>
        <div className="filter">
          <FilterByCategories />
        </div>
        <Grid container spacing={2}>
          {products.length !== 0 ? (
            displayProducts()
          ) : (
            <Typography variant="h6" className={classes.noProducts}>
              No avaiable products
            </Typography>
          )}
        </Grid>
        {products.length !== 0 ? (
          <Button
            color="primary"
            variant="contained"
            onClick={handlePageChange}
            className={classes.btn}
          >
            Browse More
          </Button>
        ) : null}
      </Container>
    </div>
  );
};

export default Products;
