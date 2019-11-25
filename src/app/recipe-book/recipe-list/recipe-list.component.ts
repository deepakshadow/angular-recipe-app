import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

import { Recipe } from "./recipe.model";
import { RecipeService } from "../recipe.service";
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"]
})
export class RecipeListComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  public recipes: Recipe[];

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit() {
    this.subscription = this.recipeService.recipeChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
    // this.recipes = this.recipeService.getRecipes();
    this.dataStorageService.onFetchingData().subscribe((data) => {
      this.recipes = data;
    })
  }

  onNewRecipe = () => {
    this.router.navigate(["new"], { relativeTo: this.route });
  };

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
