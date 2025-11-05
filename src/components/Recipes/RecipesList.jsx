import classes from "./RecipesList.module.css";
import Recipe from "./Recipe";
import RecipeContext from "../../store/recipe-context";
import { Fragment, useContext, useEffect } from "react";

const RecipeList = () => {
  const recipesCtx = useContext(RecipeContext);

  const onRemoveHandler = (id) => {
    recipesCtx.removeRecipe(id);
  };

  const recipes = recipesCtx.recipes;

  useEffect(() => {
    recipesCtx.reload();
  }, []);

  return (
    <Fragment>
      <ul className={classes.ul}>
        {recipes.map((recipe, index) => (
          <li key={index}>
            <Recipe
              recipe={recipe}
              onRemove={onRemoveHandler.bind(null, recipe.id)}
            />
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default RecipeList;
