import React from "react";

const RecipeContext = React.createContext({
    recipes: [],
    addRecipe: (recipe) => {}
});

export default RecipeContext;