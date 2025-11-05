import RecipeContext from "./recipe-context";
import { useReducer } from "react";

const defaultRecipeListState = {
  recipes: [],
};

const recipeReducer = (state, action) => {
  let recipes;
  if (action.type === "ADD") {
    recipes = [
      ...state.recipes,
      { ...action.recipe, id: Math.random().toString() },
    ];
    localStorage.setItem("recipes", JSON.stringify(recipes));
    return {
      recipes: recipes,
    };
  }
  if (action.type === "REMOVE") {
    recipes = state.recipes.filter((recipe) => recipe.id !== action.id);
    localStorage.setItem("recipes", JSON.stringify(recipes));
    return {
      recipes: recipes,
    };
  }
  if (action.type === "EDIT") {
    let rec = [];
    recipes = state.recipes.map((recipe) => {
      if (recipe.id === action.id) {
        rec.push(action.edited);
      }
      else {
        rec.push(recipe);
      }
    });
    localStorage.setItem("recipes", JSON.stringify(rec));
    return {
      recipes: rec,
    };
  }
  if (action.type === "RELOAD") {
    if (localStorage.getItem("recipes") !== null) {
      recipes = JSON.parse(localStorage.getItem("recipes"));
      return {
        recipes: recipes,
      };
    }
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

  const removeRecipeHandler = (id) => {
    dispatchRecipeAction({ type: "REMOVE", id: id });
  };

  const editRecipeHandler = (id, edited) => {
    dispatchRecipeAction({ type: "EDIT", id: id, edited: edited });
  };

  const reloadHandler = () => {
    dispatchRecipeAction({ type: "RELOAD" });
  };

  const recipeContext = {
    recipes: recipeListState.recipes,
    addRecipe: addRecipeHandler,
    removeRecipe: removeRecipeHandler,
    editRecipe: editRecipeHandler,
    reload: reloadHandler,
  };

  return (
    <RecipeContext.Provider value={recipeContext}>
      {props.children}
    </RecipeContext.Provider>
  );
};

export default RecipeProvider;
