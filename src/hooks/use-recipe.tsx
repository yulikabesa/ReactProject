import { useReducer } from "react";
import Recipe from "../models/recipe";

type State = {
  recipes: Recipe[];
};

type Action = {
  type: string;
  payload?: {id : string} | Recipe | {id: string, edited: Recipe};
};

const defaultRecipeListState = {
  recipes: [],
};


const recipeReducer = (state: State , action: Action) => {
  let recipes;
  switch (action.type) {
    case "ADD":
      recipes = [
        ...state.recipes,
        { ...(action.payload as Recipe) },
      ];
      localStorage.setItem("recipes", JSON.stringify(recipes));
      return {
        recipes: recipes,
      };
    case "REMOVE":
      recipes = state.recipes.filter((recipe) => recipe.id !== action.payload!.id);
      localStorage.setItem("recipes", JSON.stringify(recipes));
      return {
        recipes: recipes,
      };
    case "EDIT":
      let rec: Recipe[] = [];
      recipes = state.recipes.map((recipe) => {
        if (recipe.id === (action.payload!.id)) {
          rec.push((action.payload as {id: string, edited: Recipe}).edited);
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
        recipes = JSON.parse(localStorage.getItem("recipes")!);
        return {
          recipes: recipes,
        };
      }
      else {
        return defaultRecipeListState;
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

  const addRecipeHandler = (recipe: Recipe) => {
    dispatchRecipeAction({ type: "ADD", payload: recipe });
  };

  const removeRecipeHandler = (id: string) => {
    dispatchRecipeAction({ type: "REMOVE", payload: {id : id} });
  };

  const editRecipeHandler = (id: string, edited: Recipe) => {
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
