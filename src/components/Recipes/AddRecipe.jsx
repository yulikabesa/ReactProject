import classes from "./AddRecipe.module.css";
import { useState } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import DynamicInput from "../UI/DynamicInput";
import ErrorModal from "../UI/ErrorModal";

const AddRecipe = (props) => {
  const [enteredName, setEnteredname] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [enteredIngredients, setEnteredIngredients] = useState([""]);

  const [enteredInstructions, setEnteredInstructions] = useState([""]);
  const [error, setError] = useState();

  const nameChangeHandler = (event) => {
    setEnteredname(event.target.value);
  };

  // submiting
  const AddRecipeHandler = (event) => {
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
          "Please enter a valid name, ingredients and instructions (non-empty values).",
      });
      return;
    }
    if (!imagePreviewUrl.type.startsWith("image/") ){
      setError({
        title: "image must be an image file",
        message:
          "Please choose an image file.",
      });
      return;
    }
    props.onAddRecipe(
      enteredName,
      enteredIngredients.slice(0, -1),
      enteredInstructions.slice(0, -1),
      imagePreviewUrl
    );
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
        <form onSubmit={AddRecipeHandler} autoComplete="off">
          <label htmlFor="name">name</label>
          <input
            id="name"
            value={enteredName}
            type="text"
            onChange={nameChangeHandler}
          />
          <label>
            ingredients
            <DynamicInput
              name="ingredient"
              inputField={enteredIngredients}
              setInputField={setEnteredIngredients}
            />
          </label>

          <label>
            instruction
            <DynamicInput
              name="instruction"
              inputField={enteredInstructions}
              setInputField={setEnteredInstructions}
            />
          </label>

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
            ></img>
          )}

          <Button type="submit">Add Recipe</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddRecipe;
