import Card from "../UI/Card";
import List from "./List";
import classes from "./Recipe.module.css";
import removeIcon from "../../images/removeIcon.png";
import editIcon from "../../images/editIcon.png";
import { Fragment, useState } from "react";
import EditRecipe from "./EditRecipe";
import RecipeModel from "../../models/recipe";

const Recipe: React.FC<{recipe: RecipeModel; onRemove: () => void}> = (props) => {
  const [isEditing, setIsEditing] = useState(false);

  const isEditingHandler = () => {
    setIsEditing(!isEditing);
  };

  return (
    <Fragment>
      {isEditing ? (
        <EditRecipe recipe={props.recipe} setIsEditing={isEditingHandler} />
      ) : (
        <Card className={classes.users}>
          <img
              src={removeIcon}
              className={classes.icon}
              onClick={props.onRemove}
              alt="remove recipe"
            />
            <img
              src={editIcon}
              className={`${classes.icon} ${classes.edit}`}
              alt="edit recipe"
              onClick={isEditingHandler}
            />
          <header className={classes.header}>
            <h2 className={classes.name}>{props.recipe.name}</h2>
          </header>
          <img
            className={classes.selectedImg}
            id="imagePreview"
            alt="recipe picture"
            src={props.recipe.picture}
          />
          <div className={classes.title}>ingredients</div>
          <List items={props.recipe.ingredients} />
          <div className={classes.title}>instructions</div>
          <List items={props.recipe.instructions} />
        </Card>
      )}
    </Fragment>
  );
};

export default Recipe;
