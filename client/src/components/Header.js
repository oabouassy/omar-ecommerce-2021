import { Container, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    margin: "auto",
  },
  header: {
    marginTop: "1em",
  },
}));
const Header = () => {
  const classes = useStyles();
  const isSmall = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  return (
    <section>
      <Container>
        <div className={classes.root}>
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
      </Container>
    </section>
  );
};

export default Header;
