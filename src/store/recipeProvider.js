// import RecipeContext from "./recipe-context";
// import { useReducer } from "react";

// const defaultRecipesState = {
//   items: []
// };

// const cartReducer = (state, action) => {
//   if (action.type === "ADD") {
//     const updatedTotalAmount =
//       state.totalAmount + action.item.price * action.item.amount;

//     const existingCartItemIndex = state.items.findIndex(
//       (item) => item.id === action.item.id
//     );
//     const existingCartItem = state.items[existingCartItemIndex];

//     let updatedItems;

//     if (existingCartItem) {
//       const updatedItem = {
//         ...existingCartItem,
//         amount: existingCartItem.amount + action.item.amount,
//       };
//       updatedItems = [...state.items];
//       updatedItems[existingCartItemIndex] = updatedItem;
//     } else {
//       updatedItems = state.items.concat(action.item);
//     }

//     return {
//       items: updatedItems
//     };
//   }
//   return defaultRecipesState;
// };

// const RecipeProvider = (props) => {
//   const [cartState, dispatchCartAction] = useReducer(
//     cartReducer,
//     defaultRecipesState
//   );

//   const addItemHandler = (item) => {
//     dispatchCartAction({ type: "ADD", item: item });
//   };

//   const recipeContext = {
//     items: cartState.items,
//     addItem: addItemHandler,
//   };

//   return (
//     <RecipeContext.Provider value={recipeContext}>
//       {props.children}
//     </RecipeContext.Provider>
//   );
// };

// export default RecipeProvider;
