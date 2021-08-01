import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
  },
  media: {
    height: 140,
  },
}));
const MyCard = ({ image, header, body, url }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={image} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {header}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {body}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link to={url}>
          <Button size="medium" color="primary">
            More Details
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default MyCard;
