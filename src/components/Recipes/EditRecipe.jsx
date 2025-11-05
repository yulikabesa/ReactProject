import Card from "../UI/Card";
import Button from "../UI/Button";
import classes from "./Recipe.module.css";
import DynamicInput from "../UI/DynamicInput";
import { useState, useContext } from "react";
import RecipeContext from "../../store/recipe-context";

const EditRecipe = (props) => {
  const recipesCtx = useContext(RecipeContext);
  const [enteredName, setEnteredname] = useState(props.recipe.name);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(props.recipe.picture);
  const [enteredIngredients, setEnteredIngredients] = useState([
    ...props.recipe.ingredients,
    "",
  ]);
  const [enteredInstructions, setEnteredInstructions] = useState([
    ...props.recipe.instructions,
    "",
  ]);

  const nameChangeHandler = (event) => {
    setEnteredname(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setImagePreviewUrl(URL.createObjectURL(file));
      }
    } else {
      setImagePreviewUrl(null);
    }
  };

  const onSubmitChangesHandler = () => {
    recipesCtx.editRecipe(props.recipe.id, {
      name: enteredName,
      ingredients: enteredIngredients.slice(0, -1),
      instructions: enteredInstructions.slice(0, -1),
      picture: imagePreviewUrl,
      id: props.recipe.id
    });
  };

  return (
    <Card className={classes.users}>
      <form onSubmit={onSubmitChangesHandler}>
        <img
          className={classes.editImage}
          id="imagePreview"
          alt="recipe picture"
          src={imagePreviewUrl}
        />
        <label htmlFor="imageUpload" className={classes.editLabel}>
          image
        </label>
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          onChange={handleFileChange}
        />
        <label htmlFor="name" className={classes.editLabel}>
          name
        </label>
        <input
          id="name"
          value={enteredName}
          type="text"
          onChange={nameChangeHandler}
          style={{ color: "pink" }}
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
        <Button type="submit" className={classes.saveBtn}>
          Save edits
        </Button>
      </form>
    </Card>
  );
};

export default EditRecipe;
