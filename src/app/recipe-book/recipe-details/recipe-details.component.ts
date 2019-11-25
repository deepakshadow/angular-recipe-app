//official
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
//custom
import { Recipe } from "../recipe-list/recipe.model";
import { RecipeService } from "../recipe.service";

@Component({
  selector: "app-recipe-details",
  templateUrl: "./recipe-details.component.html",
  styleUrls: ["./recipe-details.component.css"]
})
export class RecipeDetailsComponent implements OnInit, OnDestroy {
  public recipe: Recipe;
  private subscription: Subscription;
  id: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.recipe = this.recipeService.getRecipe(+params["id"]);
    });
  }
  // method to pass current recipe ingredients to recipe service to transfer the data to shopping service
  onAddToShoppingList = () => {
    this.recipeService.addIngredientsToShoppinList(this.recipe.ingredients);
    this.router.navigate(["shopping-list"]);
  };
  // navigate to recipe edit page
  toEditRecipe = () => {
    this.router.navigate(["edit"], { relativeTo: this.route });
  };

  onDelete = () => {
    this.recipeService.deleteRecipe(this.id);
    this.toastr.success(`Recipe Deleted successfully`);
    setTimeout(() => {
      this.router.navigate(["../"], { relativeTo: this.route });
    }, 2000);
  };
  // on destroy of single recipe subscription
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
