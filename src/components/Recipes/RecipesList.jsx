import classes from "./RecipesList.module.css";
import Recipe from "./Recipe";
import RecipeContext from "../../store/recipe-context";
import { useContext } from "react";

const RecipeList = () => {

  const recipesCtx = useContext(RecipeContext);

  return (
    <ul className={classes.ul}>
      {recipesCtx.recipes.map((recipe, index) => (
        <li key={index}>
          <Recipe recipe={recipe} />
        </li>
      ))}
    </ul>
  );
};

export default RecipeList;
