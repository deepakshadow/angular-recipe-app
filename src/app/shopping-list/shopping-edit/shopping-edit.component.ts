import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../shopping.service';



@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('ingForm', { static: false }) ingredientForm: NgForm;
  private subscription: Subscription;
  editMode: boolean = false;
  editingItemIndex: number;
  editingItem: Ingredient;


  constructor(private shoppingService: ShoppingService) { }

  ngOnInit() {
    this.subscription = this.shoppingService.editingStarted.subscribe((index: number) => {
      this.editingItemIndex = index;
      this.editMode = true;
      this.editingItem = this.shoppingService.getIngredient(index);
      this.ingredientForm.setValue({
        recipename: this.editingItem.name,
        recipeamount: this.editingItem.amount
      })
    })
  }

  onAddList = () => {
    const addedName = this.ingredientForm.value.recipename;
    const addedAmount = this.ingredientForm.value.recipeamount;
    const newIngredient = new Ingredient(addedName, addedAmount);
    if (this.editMode) {
      this.shoppingService.updateIngredient(this.editingItemIndex, newIngredient)
    } else {
      this.shoppingService.addIngredient(newIngredient);
    }
    this.editMode = false;
    this.ingredientForm.reset();
  }

  onClear = () => {
    this.ingredientForm.reset();
    this.editMode = false;
  }

  onDelete = () => {
    this.shoppingService.deleteIngredient(this.editingItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
