import classes from "./RecipesList.module.css";
import Card from "../UI/Card";
import InputList from "./InputList";

const RecipeList = (props) => {
  return (
    <ul className={classes.ul}>
      {props.recipes.map((recipe) => (
        <li key={recipe.id}>
          <Card className={classes.users}>
            {recipe.picture && (
              <img
                className={classes.selectedImg}
                id="imagePreview"
                src={URL.createObjectURL(recipe.picture)}
              ></img>
            )}
            <div className={classes.name}>{recipe.name}</div>
            <div className={classes.title}>ingredients</div>
            <InputList items={recipe.ingredients} />
            <div className={classes.title}>instructions</div>
            <InputList items={recipe.instructions} />
          </Card>
        </li>
      ))}
    </ul>
  );
};

export default RecipeList;
