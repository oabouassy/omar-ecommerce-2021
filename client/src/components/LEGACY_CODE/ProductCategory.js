import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  NativeSelect,
  FormHelperText,
} from "@material-ui/core";
import MyCard from "../Card";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  pagination: {
    marginTop: theme.spacing(2),
  },
  link: {
    textDecoration: "none",
  },
}));

const ProductCategory = (props) => {
  const classes = useStyles();
  let category = props.match.params.category;
  let [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [page]);
  const fetchProducts = async () => {
    const res = await fetch(
      `http://localhost:5000/api/products/specific/?category=${category}&page=${page}&limit=5`
    );
    const data = await res.json();
    setTotalPages(data.totalPages);
    setProducts(data.result);
  };
  const fetchCategories = async () => {
    const res = await fetch(`http://localhost:5000/api/products/categories`);
    const data = await res.json();
    if (data.categories.length > 0) {
      setCategories(data.categories);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  let history = useHistory();
  const handleChange = (event) => {
    history.push(`/products/${event.target.value}`);
  };
  return (
    <div>
      <Container>
        <Typography variant="h4">{category.toUpperCase()}</Typography>
        <FormControl className={classes.formControl}>
          <InputLabel shrink htmlFor="products-categories">
            Category
          </InputLabel>
          <NativeSelect
            value={category}
            onChange={(e) => handleChange(e)}
            inputProps={{
              name: "product",
              id: "product-categories",
            }}
          >
            <option value="">All</option>
            {categories.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </NativeSelect>
          <FormHelperText>Products Categories</FormHelperText>
        </FormControl>
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.product_id}>
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
