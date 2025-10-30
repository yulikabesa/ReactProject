import RecipeContext from "./recipe-context";
import { useReducer } from "react";

const defaultRecipeListState = {
  recipes: []
};

const recipeReducer = (state, action) => {
  if (action.type === "ADD") {
    return {
      recipes: [...state.recipes, action.recipe]
    };
  }

  return defaultRecipeListState;
};

const RecipeProvider = (props) => {
  const [recipeListState, dispatchRecipeAction] = useReducer(
    recipeReducer,
    defaultRecipeListState
  );

  const addRecipeHandler = (recipe) => {
    dispatchRecipeAction({ type: "ADD", recipe: recipe });
  };

  const recipeContext = {
    recipes: recipeListState.recipes,
    addRecipe: addRecipeHandler,
  };

  return (
    <RecipeContext.Provider value={recipeContext}>
      {props.children}
    </RecipeContext.Provider>
  );
};

export default RecipeProvider;
