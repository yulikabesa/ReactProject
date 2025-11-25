import React from "react";
import Recipe from "../models/recipe";

type RecipeContextObj = {
  recipes: Recipe[];
  addRecipe: (recipe: Recipe) => void;
  removeRecipe: (id: string) => void;
  editRecipe: (id: string, edit: Recipe) => void;
  reload: () => void;
};

const RecipeContext = React.createContext<RecipeContextObj>({
  recipes: [],
  addRecipe: (recipe) => {},
  removeRecipe: (id) => {},
  editRecipe: (id, edit) => {},
  reload: () => {},
});

export default RecipeContext;
