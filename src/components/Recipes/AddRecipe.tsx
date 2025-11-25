import classes from "./AddRecipe.module.css";
import React ,{ useState, useContext, ChangeEvent  } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import DynamicInput from "../UI/DynamicInput";
import ErrorModal from "../UI/ErrorModal";
import RecipeContext from "../../store/recipe-context";
import Recipe from "../../models/recipe";

const AddRecipe: React.FC = () => {
  const [enteredName, setEnteredname] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [enteredIngredients, setEnteredIngredients] = useState([""]);

  const [enteredInstructions, setEnteredInstructions] = useState([""]);
  const [error, setError] = useState<null | { title: string; message: string }>();

  const { addRecipe } = useContext(RecipeContext);

  const nameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEnteredname(event.target.value);
  };

  // submiting
  const addRecipeHandler = (event: React.FormEvent) => {
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

    const newRecipe = new Recipe(enteredName, enteredIngredients.slice(0, -1), enteredInstructions.slice(0, -1), imagePreviewUrl);
    addRecipe(newRecipe);

    setEnteredname("");
    setEnteredIngredients([""]);
    setEnteredInstructions([""]);
    setImagePreviewUrl(null);
    (event.target as HTMLFormElement).reset();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setImagePreviewUrl(URL.createObjectURL(file));
      }
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
              alt="preview"
              id="imagePreview"
              className={classes.selectedImg}
              src={imagePreviewUrl}
            />
          )}
          <Button type="submit">Add Recipe</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddRecipe;
