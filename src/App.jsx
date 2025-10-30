import "./App.module.css";
import AddRecipe from "./components/Recipes/AddRecipe";
import RecipeList from "./components/Recipes/RecipesList";
import RecipeProvider from "./store/recipeProvider";

const App = () => {
  return (
    <RecipeProvider>
      <AddRecipe />
      <RecipeList />
    </RecipeProvider>
  );
};

export default App;
