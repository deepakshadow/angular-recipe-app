import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe-list/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from '../shopping-list/shopping.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeChanged: any = new Subject<Recipe[]>()

  private recipes: Recipe[] = [];

  constructor(private shoppingService: ShoppingService) { }
  // set recipes for server
  setRecipes = (recipes: Recipe[]) => {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  //method to get the whole recipes details
  getRecipes = () => {
    return this.recipes.slice();
  }
  // method to get single recipe
  getRecipe = (id: number) => {
    return this.recipes[id];
  }
  // method to share current recipe ingredients to addIngredients which is in shopping service
  addIngredientsToShoppinList = (ingredients: Ingredient[]) => {
    this.shoppingService.addIngredients(ingredients);
  }

  addRecipe = (newRecipe: Recipe) => {
    this.recipes.push(newRecipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe = (index: number, newRecipe: Recipe) => {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice())
  }

  deleteRecipe = (index: number) => {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice())
  }

}
