import { useState, useEffect } from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import MyCard from "./Card";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  pagination: {
    marginTop: theme.spacing(2),
  },
}));

const ProductCategory = (props) => {
  const classes = useStyles();
  let category = props.match.params.category;
  let [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [page]);
  const fetchProducts = async () => {
    const res = await fetch(
      `http://localhost:5000/api/products/specific/?category=${category}&page=${page}&limit=5`
    );
    const data = await res.json();
    setTotalPages(data.totalPages);
    setProducts(data.result);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  return (
    <div>
      <Container>
        <Typography variant="h4">{category.toUpperCase()}</Typography>
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.product_id}>
              <MyCard
                image={`http://localhost:5000${product.product_img_link}`}
                header={product.product_name}
                body={product.product_details}
              />
            </Grid>
          ))}
        </Grid>
        <Pagination
          count={totalPages}
          color="primary"
          page={page}
          onChange={handlePageChange}
          className={classes.pagination}
        />
      </Container>
    </div>
  );
};

export default ProductCategory;
