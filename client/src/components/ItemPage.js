import { useState, useEffect } from "react";
import {
  Typography,
  Container,
  makeStyles,
  Grid,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "8rem",
  },
  header: {
    textAlign: "center",
    paddingBottom: "1rem",
  },
  media: {
    display: "block",
    maxWidth: "25rem",
    margin: "auto",
  },
  // fContainer: {
  //   background: "green",
  // },
  // sContainer: {
  //   background: "yellow",
  // },
}));

const ItemPage = (props) => {
  const classes = useStyles();
  const productID = props.match.params.productID;
  const [product, setProduct] = useState({});
  useEffect(() => {
    fetchProduct();
  }, []);
  const fetchProduct = async () => {
    const res = await fetch(
      `http://localhost:5000/api/products/single?id=${productID}`
    );
    const data = await res.json();
    if (data.product) {
      setProduct(data.product);
    }
  };
  return (
    <Container maxWidth="lg" className={classes.root}>
      {/* Outer Container */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          {/* Container for: title & image */}
          <div className={classes.fContainer}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h3" className={classes.header}>
                  {product.product_name}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <img
                  className={classes.media}
                  src={`http://localhost:5000${product.product_img_link}`}
                  alt={product.product_name}
                />
              </Grid>
            </Grid>
          </div>
        </Grid>

        <Grid item xs={12} md={6}>
          {/* Container for: price & Description */}
          <div className={classes.sContainer}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">
                  {product.product_price} EGP
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  {product.product_details}
                  {/* Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Autem, tempore, modi nobis distinctio praesentium optio
                  expedita minus nihil laborum animi dignissimos, molestias
                  ratione quasi fugit natus quae in. Dolorem, consequuntur
                  facilis. Tempora maxime dolor laborum repudiandae, explicabo
                  ipsum nobis dolores delectus necessitatibus nemo eligendi
                  distinctio dicta. Dolore voluptatem illo ullam. */}
                </Typography>
              </Grid>
              <Grid item>
                <Button color="primary" variant="contained">
                  Add to Cart
                </Button>
              </Grid>
            </Grid>
          </div>
        </Grid>
        {/* Container for Add to Card */}
      </Grid>
    </Container>
  );
};

export default ItemPage;
