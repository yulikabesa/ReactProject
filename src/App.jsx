import "./App.module.css";
import AddRecipe from "./components/Recipes/AddRecipe";
import RecipeList from "./components/Recipes/RecipesList";
import RecipeProvider from "./store/recipeProvider";
import { Fragment } from "react";

const App = () => {
  return (
    <Fragment>
      <AddRecipe />
      <RecipeList />
    </Fragment>
  );
};

export default App;
