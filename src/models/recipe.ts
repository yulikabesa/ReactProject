class Recipe {
  name: string;
  ingredients: string[];
  instructions: string[];
  picture: string;
  id: string;

  constructor(name: string, ingredients: string[], instructions: string[], picture: string, id?: string) {
    this.name = name;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.picture = picture;
    if (id){
      this.id = id;
    } else {
      this.id = Math.random().toString();
    }
  }
}

export default Recipe;
