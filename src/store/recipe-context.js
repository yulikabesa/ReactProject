import React from "react";

const RecipeContext = React.createContext({
    recipesList: [],
    addItem: (item) => {}
});

export default RecipeContext;