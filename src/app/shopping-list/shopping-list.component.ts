import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shopping.service';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  public ingredients: Ingredient[];
  public subcription: Subscription;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit() {
    this.ingredients = this.shoppingService.getIngredients();
    this.subcription =  this.shoppingService.ingredientChanged.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    });
  }

  onEditItem = (index: number) => {
    this.shoppingService.editingStarted.next(index)
  }

  ngOnDestroy() {
    this.subcription.unsubscribe()
  }



} 
