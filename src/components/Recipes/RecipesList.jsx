import classes from "./RecipesList.module.css";
import Recipe from "./Recipe";

const RecipeList = (props) => {
  return (
    <ul className={classes.ul}>
      {props.recipes.map((recipe, index) => (
        <li key={index}>
          <Recipe recipe={recipe} />
        </li>
      ))}
    </ul>
  );
};

export default RecipeList;
