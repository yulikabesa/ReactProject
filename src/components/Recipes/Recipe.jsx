import Card from "../UI/Card";
import List from "./List";
import classes from "./Recipe.module.css";

const Recipe = (props) => {
  return (
    <Card className={classes.users}>
      <img
        className={classes.selectedImg}
        id="imagePreview"
        src={URL.createObjectURL(props.recipe.picture)}
      ></img>

      <div className={classes.name}>{props.recipe.name}</div>
      <div className={classes.title}>ingredients</div>
      <List items={props.recipe.ingredients} />
      <div className={classes.title}>instructions</div>
      <List items={props.recipe.instructions} />
    </Card>
  );
};

export default Recipe;
