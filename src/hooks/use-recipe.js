import { useReducer } from "react";

const defaultRecipeListState = {
  recipes: [],
};

const recipeReducer = (state, action) => {
  let recipes;
  switch (action.type) {
    case "ADD":
      recipes = [
        ...state.recipes,
        { ...action.payload, id: Math.random().toString() },
      ];
      localStorage.setItem("recipes", JSON.stringify(recipes));
      return {
        recipes: recipes,
      };
    case "REMOVE":
      recipes = state.recipes.filter((recipe) => recipe.id !== action.payload);
      localStorage.setItem("recipes", JSON.stringify(recipes));
      return {
        recipes: recipes,
      };
    case "EDIT":
      let rec = [];
      recipes = state.recipes.map((recipe) => {
        if (recipe.id === action.payload.id) {
          rec.push(action.payload.edited);
        } else {
          rec.push(recipe);
        }
      });
      localStorage.setItem("recipes", JSON.stringify(rec));
      return {
        recipes: rec,
      };
    case "RELOAD":
      if (localStorage.getItem("recipes") !== null) {
        recipes = JSON.parse(localStorage.getItem("recipes"));
        return {
          recipes: recipes,
        };
      }
    default:
      return defaultRecipeListState;
  }
};

const useRecipe = () => {
  const [recipeListState, dispatchRecipeAction] = useReducer(
    recipeReducer,
    defaultRecipeListState
  );

  const addRecipeHandler = (recipe) => {
    dispatchRecipeAction({ type: "ADD", payload: recipe });
  };

  const removeRecipeHandler = (id) => {
    dispatchRecipeAction({ type: "REMOVE", payload: id });
  };

  const editRecipeHandler = (id, edited) => {
    dispatchRecipeAction({ type: "EDIT", payload : {id: id, edited: edited} });
  };

  const reloadHandler = () => {
    dispatchRecipeAction({ type: "RELOAD" });
  };

  return {
    recipes: recipeListState.recipes,
    addRecipe: addRecipeHandler,
    removeRecipe: removeRecipeHandler,
    editRecipe: editRecipeHandler,
    reload: reloadHandler,
  };
};

export default useRecipe;
