import { useState, useEffect, useContext } from "react";
import userContext from "../context/userContext";
import { Typography, Paper, Grid, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    maxWidth: "70%",
  },
  header: {
    marginBottom: "2rem",
    padding: "1rem",
    borderLeft: "6px solid #313f8c",
    textAlign: "left",
  },
  commentContent: {
    marginLeft: "2rem",
  },
  newComment: {
    textAlign: "left",
    marginLeft: "2rem",
    marginTop: "3rem",
  },
  alert: {
    width: "100%",
    marginTop: "2rem",
  },
}));

const ProductComments = ({ productId }) => {
  const classes = useStyles();
  const [userInfo] = useContext(userContext);
  const [error, setError] = useState(false);
  const [comments, setComments] = useState([]);
  const [isCommentsUpdated, setIsCommentsUpdated] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [err, setErr] = useState(false);
  const [isNew, setIsNew] = useState(false);
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
      <div className={classes.commentContent}>
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
      </div>
    );
    return all;
  };
  const handleCommentChange = (e) => {
    setCommentValue(e.target.value);
  };
  const addNewComment = async () => {
    // if it's empty -> do nothing
    if (commentValue.length === 0) return;
    // add it
    try {
      const res = await fetch(`http://localhost:5000/api/comment/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          comment_details: commentValue,
          customer_id: userInfo.customer_id,
          product_id: productId,
        }),
      });
      const data = await res.json();
      if (data?.comment?.comment_id) {
        setIsCommentsUpdated(!isCommentsUpdated);
        setErr(false);
        setIsNew(true);
        setTimeout(() => {
          setIsNew(false);
        }, 3000);
      }
    } catch (error) {
      console.log("ERROR while adding a new comment");
      setErr(true);
      setIsNew(false);
      setTimeout(() => {
        setErr(false);
      }, 3000);
    }
  };
  return (
    <div>
      <Typography variant="h4" className={classes.header}>
        Comments
      </Typography>
      {error ? <h3>Error occured while fetching product's comments</h3> : null}
      {!error && comments.length === 0 ? <h3>No comments yet</h3> : null}
      {!error && comments.length > 0 ? <ShowComments /> : null}
      {/* ADD NEW COMMENT */}
      <div className={classes.newComment}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={10} sm={8}>
            <TextField
              id="standard-multiline-flexible"
              label="Write a comment ... "
              multiline
              fullWidth
              maxRows={4}
              value={commentValue}
              onChange={handleCommentChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button variant="contained" color="primary" onClick={addNewComment}>
              Add Comment
            </Button>
          </Grid>
        </Grid>
        {err ? (
          <div className={classes.alert}>
            <Alert severity="error">
              There is an error occured — add your comment again!
            </Alert>
          </div>
        ) : null}
        {isNew && !err ? (
          <div className={classes.alert}>
            <Alert severity="success">
              Your comment has been added succesfully!
            </Alert>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProductComments;
