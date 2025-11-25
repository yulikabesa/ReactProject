import classes from "./RecipesList.module.css";
import Recipe from "./Recipe";
import RecipeContext from "../../store/recipe-context";
import { Fragment, useContext, useEffect } from "react";

const RecipeList: React.FC = () => {
  const {removeRecipe, reload, recipes} = useContext(RecipeContext);

  const onRemoveHandler = (id: string) => {
    removeRecipe(id);
  };

  useEffect(() => {
    reload();
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
