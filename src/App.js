import { useState } from "react";
import AddRecipe from "./components/Recipes/AddRecipe";
import RecipeList from "./components/Recipes/RecipesList";

const App = () => {
  const [recipesList, setRecipesList] = useState([]);

  const addRecipeHandler = (name, ingredients, instructions, picture) => {
    setRecipesList((prevList) => {
      return [
        ...prevList,
        {
          name,
          ingredients,
          instructions,
          picture,
          id: Math.random().toString(),
        },
      ];
    });
  };

  return (
    <div>
      <AddRecipe onAddRecipe={addRecipeHandler} />
      <RecipeList recipes={recipesList} />
    </div>
  );
};

export default App;
