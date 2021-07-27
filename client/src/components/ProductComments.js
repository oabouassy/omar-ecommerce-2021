import { useState, useEffect, useContext } from "react";
import userContext from "../context/userContext";
import { Typography, Paper, Grid, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    maxWidth: "70%",
  },
  heading: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
}));

const ProductComments = ({ productId }) => {
  const classes = useStyles();
  const [userInfo] = useContext(userContext);
  const [error, setError] = useState(false);
  const [comments, setComments] = useState([]);
  const [isCommentsUpdated, setIsCommentsUpdated] = useState(false);
  const [newComment, setNewComment] = useState("");
  useEffect(() => {
    getComments();
  }, [isCommentsUpdated]);
  const getComments = async () => {
    const res = await fetch(
      `http://localhost:5000/api/comment/all/?product_id=${productId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    if (data?.comments?.length > 0) {
      setComments(data.comments);
    } else {
      setError(true);
    }
  };
  const ShowComments = () => {
    const all = (
      <Grid container spacing={2}>
        {comments.map((co) => (
          <Grid item xs={12} key={co.comment_id}>
            <Paper className={classes.paper}>
              <Grid container>
                <Grid container spacing={2}>
                  <Grid item>
                    <strong>
                      {co.customer_firstname} {co.customer_lastname}
                    </strong>
                  </Grid>
                  <Grid item>{co.comment_details}</Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>
    );
    return all;
  };
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };
  const addNewComment = async () => {
    // if it's empty -> do nothing
    if (newComment.length === 0) return;
    // add it
    try {
      const res = await fetch(`http://localhost:5000/api/comment/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          comment_details: newComment,
          customer_id: userInfo.customer_id,
          product_id: productId,
        }),
      });
      const data = await res.json();
      if (data?.comment?.comment_id) {
        setIsCommentsUpdated(!isCommentsUpdated);
      }
    } catch (error) {
      console.log("ERROR while adding a new comment");
    }
  };
  return (
    <div>
      <Typography variant="h4" className={classes.heading}>
        Comments
      </Typography>
      {error ? <h3>Error occured while fetching product's comments</h3> : null}
      {!error && comments.length === 0 ? <h3>No comments yet</h3> : null}
      {!error && comments.length > 0 ? <ShowComments /> : null}
      {/* ADD NEW COMMENT */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="standard-multiline-flexible"
            label="Write a comment ... "
            multiline
            maxRows={4}
            value={newComment}
            onChange={handleCommentChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={addNewComment}>
            Add Comment
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductComments;
