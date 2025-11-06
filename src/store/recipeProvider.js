import useRecipe from "../hooks/use-recipe";
import RecipeContext from "./recipe-context";

const RecipeProvider = (props) => {
  const recipeContext = useRecipe();

  return (
    <RecipeContext.Provider value={recipeContext}>
      {props.children}
    </RecipeContext.Provider>
  );
};

export default RecipeProvider;
