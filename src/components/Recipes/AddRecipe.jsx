import classes from "./AddRecipe.module.css";
import { useState, useContext } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import DynamicInput from "../UI/DynamicInput";
import ErrorModal from "../UI/ErrorModal";
import RecipeContext from "../../store/recipe-context";

const AddRecipe = () => {
  const [enteredName, setEnteredname] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [enteredIngredients, setEnteredIngredients] = useState([""]);

  const [enteredInstructions, setEnteredInstructions] = useState([""]);
  const [error, setError] = useState();

  const recipesCtx = useContext(RecipeContext);

  const nameChangeHandler = (event) => {
    setEnteredname(event.target.value);
  };

  // submiting
  const addRecipeHandler = (event) => {
    event.preventDefault();
    if (
      enteredName.length === 0 ||
      imagePreviewUrl === null ||
      enteredIngredients[0] === "" ||
      enteredInstructions[0] === ""
    ) {
      setError({
        title: "fields cannot be empty",
        message:
          "Please enter a valid name, ingredients, instructions and image.",
      });
      return;
    }
    if (!imagePreviewUrl.type.startsWith("image/")) {
      setError({
        title: "image must be an image file",
        message: "Please choose an image file.",
      });
      return;
    }
    recipesCtx.addRecipe({
      name: enteredName,
      ingredients: enteredIngredients.slice(0, -1),
      instructions: enteredInstructions.slice(0, -1),
      picture: imagePreviewUrl
    });
    
    setEnteredname("");
    setEnteredIngredients([""]);
    setEnteredInstructions([""]);
    setImagePreviewUrl(null);
    event.target.reset();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreviewUrl(file);
    } else {
      setImagePreviewUrl(null);
    }
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <div className={classes.title}>Add Recipe</div>
        <form onSubmit={addRecipeHandler} autoComplete="off">
          <label htmlFor="name">name</label>
          <input
            id="name"
            value={enteredName}
            type="text"
            onChange={nameChangeHandler}
          />
          <DynamicInput
            name="ingredient"
            inputField={enteredIngredients}
            setInputField={setEnteredIngredients}
          />

          <DynamicInput
            name="instruction"
            inputField={enteredInstructions}
            setInputField={setEnteredInstructions}
          />
          <label htmlFor="imageUpload">image</label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleFileChange}
          />
          {imagePreviewUrl && (
            <img
              alt="image not found"
              id="imagePreview"
              className={classes.selectedImg}
              src={URL.createObjectURL(imagePreviewUrl)}
            />
          )}
          <Button type="submit">Add Recipe</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddRecipe;
