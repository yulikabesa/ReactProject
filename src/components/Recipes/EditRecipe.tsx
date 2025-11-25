import Card from "../UI/Card";
import Button from "../UI/Button";
import classes from "./Recipe.module.css";
import DynamicInput from "../UI/DynamicInput";
import { useState, useContext, ChangeEvent } from "react";
import RecipeContext from "../../store/recipe-context";
import Recipe from "../../models/recipe";

const EditRecipe: React.FC<{ recipe: Recipe; setIsEditing: () => void }> = (
  props
) => {
  const recipesCtx = useContext(RecipeContext);
  const [enteredName, setEnteredname] = useState(props.recipe.name);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(
    props.recipe.picture
  );
  const [enteredIngredients, setEnteredIngredients] = useState([
    ...props.recipe.ingredients,
    "",
  ]);
  const [enteredInstructions, setEnteredInstructions] = useState([
    ...props.recipe.instructions,
    "",
  ]);

  const [isThereError, setisThereError] = useState(false);

  const nameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEnteredname(event.target.value);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file?.type.startsWith("image/")) {
        setImagePreviewUrl(URL.createObjectURL(file));
      }
    } else {
      setImagePreviewUrl(null);
    }
  };

  const onButtonclickHandler = () => {
    if (
      enteredName.length === 0 ||
      imagePreviewUrl === null ||
      enteredIngredients[0] === "" ||
      enteredInstructions[0] === ""
    ) {
      setisThereError(true);
      return;
    }
    setisThereError(false);
    const rec = new Recipe(enteredName, enteredIngredients.slice(0, -1), enteredInstructions.slice(0, -1), imagePreviewUrl, props.recipe.id);
    recipesCtx.editRecipe(props.recipe.id, rec);
    props.setIsEditing();
  };

  return (
    <Card className={classes.users}>
      <header className={classes.header}>
        <h2 className={classes.name}>{props.recipe.name}</h2>
      </header>

      {imagePreviewUrl ? (
        <img
          className={classes.editImage}
          alt="recipe picture"
          src={imagePreviewUrl}
        />
      ) : (
        <p>No Image</p>
      )}

      <div className={classes.info}>
        <p className={classes.editLabel}>image</p>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <p className={classes.editLabel}>name</p>
        <input value={enteredName} type="text" onChange={nameChangeHandler} />
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
      </div>
      {isThereError && (
        <p className={classes.editingError}>fields cant be empty</p>
      )}
      <Button onClick={onButtonclickHandler} className={classes.saveBtn}>
        Save edits
      </Button>
    </Card>
  );
};

export default EditRecipe;
