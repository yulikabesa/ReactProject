import React from "react";

const RecipeContext = React.createContext({
    recipes: [],
    addRecipe: (recipe) => {},
    removeRecipe: (id) => {},
    editRecipe: (id, edit) => {},
    reload : () => {}
});

export default RecipeContext;