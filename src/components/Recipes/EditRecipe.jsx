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

  const [isThereError, setisThereError] = useState(false);

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
    recipesCtx.editRecipe(props.recipe.id, {
      name: enteredName,
      ingredients: enteredIngredients.slice(0, -1),
      instructions: enteredInstructions.slice(0, -1),
      picture: imagePreviewUrl,
      id: props.recipe.id,
    });
    props.setIsEditing();
  };

  return (
    <Card className={classes.users}>
      <header className={classes.header}>
        <h2 className={classes.name}>{props.recipe.name}</h2>
      </header>
      
      <img
        className={classes.editImage}
        alt="recipe picture"
        src={imagePreviewUrl}
      />
      <div className={classes.info}>
        <p className={classes.editLabel}>
          image
        </p>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <p className={classes.editLabel}>
          name
        </p>
        <input
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
      </div>
      {isThereError && <p className={classes.editingError}>fields cant be empty</p>}
      <Button onClick={onButtonclickHandler} className={classes.saveBtn}>
        Save edits
      </Button>
    </Card>
  );
};

export default EditRecipe;
