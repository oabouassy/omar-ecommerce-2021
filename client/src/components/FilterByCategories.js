import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";

// STYLING
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  pagination: {
    marginTop: theme.spacing(2),
  },
  link: {
    textDecoration: "none",
  },
}));

const FilterByCategories = () => {
  useEffect(() => {
    fetchCategories();
  }, []);
  const [categories, setCategories] = useState([]);
  const classes = useStyles();
  const history = useHistory();
  const goToCategoryPage = (e) => {
    history.push(`/products/${e.target.value}`);
  };
  const fetchCategories = async () => {
    const res = await fetch(`http://localhost:5000/api/products/categories`);
    const data = await res.json();
    if (data.categories.length > 0) {
      setCategories(data.categories);
    }
  };
  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel shrink htmlFor="products-categories">
          Category
        </InputLabel>
        <NativeSelect
          onChange={(e) => goToCategoryPage(e)}
          inputProps={{
            name: "product",
            id: "product-categories",
          }}
        >
          <option value="">All</option>
          {categories.map((category) => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </NativeSelect>
        <FormHelperText>Products Categories</FormHelperText>
      </FormControl>
    </>
  );
};

export default FilterByCategories;
