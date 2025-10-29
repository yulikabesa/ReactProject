import classes from "./RecipesList.module.css";
import Card from "../UI/Card";
import List from "./List";

const RecipeList = (props) => {
  return (
    <ul className={classes.ul}>
      {props.recipes.map((recipe) => (
        <li key={recipe.id}>
          <Card className={classes.users}>
            <img
              className={classes.selectedImg}
              id="imagePreview"
              src={URL.createObjectURL(recipe.picture)}
            ></img>

            <div className={classes.name}>{recipe.name}</div>
            <div className={classes.title}>ingredients</div>
            <List items={recipe.ingredients} />
            <div className={classes.title}>instructions</div>
            <List items={recipe.instructions} />
          </Card>
        </li>
      ))}
    </ul>
  );
};

export default RecipeList;
