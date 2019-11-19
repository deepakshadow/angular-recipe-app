import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  ingredientChanged: any = new Subject<Ingredient[]>();
  editingStarted: any = new Subject<number>();

  private ingredients: Ingredient[] = [new Ingredient('tomato', 10),
  new Ingredient('onion', 1), new Ingredient('potato', 5)]

  constructor() { }

  // method to get ingredients
  getIngredients = () => {
    return this.ingredients.slice();
  }
  // method to get single ingredient
  getIngredient = (index: number) => {
    return this.ingredients[index];
  }

  // method to add new ingredients to shopping lists
  addIngredient = (ingredient: Ingredient) => {
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients.slice()); 
  }

  // method to share recipe ingredients to shopping list
  addIngredients = (ingredients: Ingredient[]) => {
    this.ingredients.push(...ingredients);
    this.ingredientChanged.next(this.ingredients.slice())
  }
  // method to update ingredient
  updateIngredient = (index: number, newIngredient: Ingredient) => {
    this.ingredients[index] = newIngredient;
    this.ingredientChanged.next(this.ingredients.slice());
  }
  // method to delete a ingredient
  deleteIngredient = (index: number) => {
    this.ingredients.splice(index, 1);
    this.ingredientChanged.next(this.ingredients.slice());
  }
}
