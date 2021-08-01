import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  curved: {
    position: "relative",
    background: "#2c3e50",
    borderBottomLeftRadius: "50% 20%",
    borderBottomRightRadius: "50% 20%",
    textAlign: "center",
    marginTop: "3rem",
    paddingBottom: "5rem",
    background: "#313f8c",
    overflow: "hidden",
    marginBottom: "34vh",
  },
  margin: {
    paddingTop: "5.3rem",
    color: "#e1e1e1",
  },
}));
const Header = () => {
  const classes = useStyles();
  const isSmall = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  return (
    <section className={classes.curved}>
      <div className={classes.margin}>
        <Grid container>
          <Grid item xs={12}>
            <Typography
              className={classes.header}
              variant={isSmall ? "h1" : "h2"}
              component="h2"
              gutterBottom
            >
              The Modern Market
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Buy All you want from one place by a few clicks
            </Typography>
          </Grid>
        </Grid>
      </div>
    </section>
  );
};

export default Header;
