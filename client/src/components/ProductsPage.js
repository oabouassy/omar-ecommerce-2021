import { useState, useEffect } from "react";
import MyCard from "./Card";
import { Grid, Typography, Container } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "./Pagination";
import FilterByCategories from "./FilterByCategories";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(15),
  },
  link: {
    textDecoration: "none",
  },
  grid: {
    marginTop: theme.spacing(3),
  },
}));

const ProductsPage = (props) => {
  const classes = useStyles();
  const [page, setPage] = useState(+props.match.params.pageNumber);
  let [totalPages, setTotalPages] = useState(page);
  let [products, setProducts] = useState([]);
  const [empty, setEmpty] = useState(false);
  useEffect(() => {
    fetchPageProducts();
  }, [page]);
  const fetchPageProducts = async () => {
    const res = await fetch(
      `http://localhost:5000/api/products/?page=${page}&limit=10`
    );
    const data = await res.json();
    if (data?.result.length === 0) {
      setEmpty(true);
    } else {
      setProducts(data.result);
      setTotalPages(data.totalPages);
    }
  };
  let history = useHistory();
  let handlePageChange = (event, value) => {
    history.push(`/products/p/${value}`);
    setPage(value);
  };
  return (
    <>
      <Container className={classes.root}>
        {!empty ? (
          <>
            <Typography variant="h3">All products</Typography>
            <Typography variant="body1">page: {page}</Typography>
            <FilterByCategories />
            <Grid container spacing={2} className={classes.grid}>
              {products.map((product) => (
                <Grid item xs={12} sm={6} md={3} key={product.product_id}>
                  <Link
                    to={`/product/id/${product.product_id}`}
                    className={classes.link}
                  >
                    <MyCard
                      image={`http://localhost:5000${product.product_img_link}`}
                      header={product.product_name}
                      body={product.product_details}
                    />
                  </Link>
                </Grid>
              ))}
            </Grid>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
            />
          </>
        ) : (
          <h4>There are no more products !</h4>
        )}
      </Container>
    </>
  );
};

export default ProductsPage;
