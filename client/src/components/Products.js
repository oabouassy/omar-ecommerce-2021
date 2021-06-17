import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Grid, Typography } from "@material-ui/core";
import MyCard from "./Card";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  pagination: {
    marginTop: theme.spacing(2),
  },
}));

const Products = () => {
  const classes = useStyles();
  let [page, setPage] = useState(1);
  let [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    // fetchCategories();
    fetchProducts();
  }, [page]);
  const fetchProducts = async () => {
    // fetch all products
    const res = await fetch(
      `http://localhost:5000/api/products/?page=${page}&limit=10`
    );
    const data = await res.json();
    setTotalPages(data.totalPages);
    setProducts(data.result);
  };
  // const fetchCategories = async () => {
  //   const res = await fetch(`http://localhost:5000/api/products/categories`);
  //   const data = await res.json();
  //   console.log("categories: ", data);
  // };
  let history = useHistory();
  const handleChange = (event) => {
    history.push(`/products/${event.target.value}`);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  return (
    <div>
      <Container>
        <Typography variant="h3">Products</Typography>
        <FormControl className={classes.formControl}>
          <InputLabel
            shrink
            htmlFor="products-categories-native-label-placeholder"
          >
            Category
          </InputLabel>
          <NativeSelect
            onChange={(e) => handleChange(e)}
            inputProps={{
              name: "product",
              id: "product-categories-native-label-placeholder",
            }}
          >
            {/* MAKE IT DYNAMIC !!! */}
            <option value="/">All</option>
            <option value="animals">Animals</option>
          </NativeSelect>
          <FormHelperText>Products Categories</FormHelperText>
        </FormControl>
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

export default Products;
