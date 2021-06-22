import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  pagination: {
    marginTop: theme.spacing(2),
  },
}));

const CustomPagination = ({ count, page, onChange }) => {
  const classes = useStyles();
  return (
    <Pagination
      count={count}
      page={page}
      onChange={onChange}
      color="primary"
      className={classes.pagination}
    />
  );
};

export default CustomPagination;
