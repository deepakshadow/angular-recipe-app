import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { RecipeRouteModule } from '../recipe-route/recipe-route.module';
import { SharedModule } from 'src/app/shared/shared/shared.module';

import { RecipeBookComponent } from '../recipe-book.component';
import { RecipeDetailsComponent } from '../recipe-details/recipe-details.component';
import { SelectRecipeComponent } from '../select-recipe/select-recipe.component';
import { RecipeEditComponent } from '../recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from '../recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from '../recipe-list/recipe-list.component';


@NgModule({
  declarations: [
    RecipeBookComponent,
    RecipeDetailsComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeEditComponent,
    SelectRecipeComponent
  ],
  imports: [
    ReactiveFormsModule,
    RecipeRouteModule,
    SharedModule
  ]
})
export class RecipeModule { }
