import { useState, useEffect, useContext } from "react";
import userContext from "../context/userContext";
import { Typography, Paper, Grid, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [comments, setComments] = useState([]);
  const [isCommentsUpdated, setIsCommentsUpdated] = useState(false);
  const [commentValue, setCommentValue] = useState("");
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
    if (data.comments?.length > 0) {
      setComments(data.comments);
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
  // options for toastify
  const errorOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
  const successOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
  const addNewComment = async () => {
    // if it's empty -> do nothing
    if (commentValue.length === 0) {
      toast.error("Your comment is empty !", errorOptions);
      return;
    }
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
        toast.success("Your comment has been added !", successOptions);
        setIsCommentsUpdated(!isCommentsUpdated);
        setCommentValue("");
      } else {
        toast.error("Error, try add it again !", errorOptions);
      }
    } catch (error) {
      console.log("ERROR while adding a new comment");
      console.log(error.message);
    }
  };
  return (
    <div>
      <Typography variant="h4" className={classes.header}>
        Comments
      </Typography>
      {comments.length === 0 ? <h3>No comments yet</h3> : null}
      {comments.length > 0 ? <ShowComments /> : null}
      {/* ADD NEW COMMENT */}
      {userInfo.customer_id ? (
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
              <Button
                variant="contained"
                color="primary"
                onClick={addNewComment}
              >
                Add Comment
              </Button>
            </Grid>
          </Grid>
        </div>
      ) : (
        <Link to="/auth/login">
          <Button
            style={{ marginTop: "2rem" }}
            variant="contained"
            color="secondary"
          >
            Sign In to add a comment
          </Button>
        </Link>
      )}
    </div>
  );
};

export default ProductComments;
