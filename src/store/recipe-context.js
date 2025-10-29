import React from "react";

const RecipeContext = React.createContext({
    recipes: [],
    addItem: (item) => {}
});

export default RecipeContext;