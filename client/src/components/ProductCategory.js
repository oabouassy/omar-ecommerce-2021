import { useState, useEffect } from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import MyCard from "./Card";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import { Link } from "react-router-dom";
import FilterByCategories from "./FilterByCategories";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  pagination: {
    marginTop: theme.spacing(2),
  },
  link: {
    textDecoration: "none",
  },
  root: {
    marginTop: "8rem",
  },
  header: {
    marginBottom: "2rem",
    padding: "1rem",
    borderLeft: "6px solid #313f8c",
  },
}));

const ProductCategory = (props) => {
  const classes = useStyles();
  let category = props.match.params.category;
  // let page = +props.match.params.pageNumber
  const [page, setPage] = useState(+props.match.params.pageNumber);
  const [totalPages, setTotalPages] = useState(1);
  const [products, setProducts] = useState([]);
  const [msg, setMsg] = useState("");
  useEffect(() => {
    fetchProducts();
  }, [page]);
  const fetchProducts = async () => {
    const res = await fetch(
      `http://localhost:5000/api/products/specific/?category=${category}&page=${page}&limit=10`
    );
    const data = await res.json();
    if (data.result) {
      if (data.result.length > 0) {
        setMsg("");
        setTotalPages(data.totalPages);
        setProducts(data.result);
      } else {
        setMsg("No More Products");
      }
    }
  };
  let history = useHistory();
  const handlePageChange = (event, value) => {
    console.log(value);
    setPage(value);
    history.push(`/products/${category}/p/${value}`);
  };

  return (
    <div className={classes.root}>
      <Container>
        <Typography variant="h4" className={classes.header}>
          {category.toUpperCase()}
        </Typography>
        <FilterByCategories selectedCategory={category} />
        {msg ? (
          <h1>{msg}</h1>
        ) : (
          <Grid container spacing={2}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.product_id}>
                <MyCard
                  image={`http://localhost:5000${product.product_img_link}`}
                  header={product.product_name}
                  body={product.product_details}
                  url={`/product/id/${product.product_id}`}
                />
              </Grid>
            ))}
          </Grid>
        )}
        <div style={{ marginTop: "3rem" }}>
          <Pagination
            count={totalPages}
            color="primary"
            page={page}
            onChange={handlePageChange}
            className={classes.pagination}
          />
        </div>
      </Container>
    </div>
  );
};

export default ProductCategory;
