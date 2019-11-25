import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { RecipeService } from "../recipe.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"]
})
export class RecipeEditComponent implements OnInit {
  public id: number;
  public editMode: boolean = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params["id"];
      this.editMode = params["id"] != null;
      // console.log(this.editMode);
      this.initForm();
    });
  }

  onSubmit = () => {
    // console.log(this.recipeForm);
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
      this.toastr.success(`Recipe Edited Successfully`);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
      this.toastr.success(`New Recipe Created Successfully`);
    }
    setTimeout(() => {
    this.router.navigate(["../"], { relativeTo: this.route });
    }, 2000);
  };

  private initForm = () => {
    let recipeName = "";
    let recipeImagePath = "";
    let recipeDescription = "";
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.image;
      recipeDescription = recipe.description;
      if (recipe["ingredients"]) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      image: new FormControl(recipeImagePath, Validators.required),
      ingredients: recipeIngredients
    });
  };

  ingredientCtrls = () => {
    return (<FormArray>this.recipeForm.get("ingredients")).controls;
  };

  onAddIngredient = () => {
    return (<FormArray>this.recipeForm.get("ingredients")).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  };

  onDeleteIngredient = (index: number) => {
    // removes one
    return (<FormArray>this.recipeForm.get("ingredients")).removeAt(index);
    // removes whole array
    // return (<FormArray>this.recipeForm.get('ingredients')).clear();
  };

  onCancel = () => {
    this.router.navigate(["../"], { relativeTo: this.route });
  };
}
