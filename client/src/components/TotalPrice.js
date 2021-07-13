import { useContext, useState } from "react";
import StripeContainer from "./Stripe/StripeContainer";
import cartTotalPriceContext from "../context/cartTotalPrice";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  price: {
    display: "block",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    textAlign: "center",
  },
}));

const TotalPrice = () => {
  const classes = useStyles();
  const [cartTotalPrice, setCartTotalPrice] = useContext(cartTotalPriceContext);
  const [payNow, setPayNow] = useState(false);
  return (
    <Grid>
      <Typography variant="h5" className={classes.price}>
        Total: {cartTotalPrice} $
      </Typography>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Pay With Card</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <StripeContainer />
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
};

export default TotalPrice;
