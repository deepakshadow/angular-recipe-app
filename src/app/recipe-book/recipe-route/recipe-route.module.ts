import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { RecipeBookComponent } from '../recipe-book.component';
import { SelectRecipeComponent } from '../select-recipe/select-recipe.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { RecipeEditComponent } from '../recipe-edit/recipe-edit.component';
import { RecipeDetailsComponent } from '../recipe-details/recipe-details.component';
import { ResolveService } from '../resolve.service';

const routes: Routes = [
  {
    path: '', component: RecipeBookComponent, canActivate: [AuthGuard], children: [
      { path: '', component: SelectRecipeComponent },
      { path: 'new', component: RecipeEditComponent },
      { path: ':id', component: RecipeDetailsComponent, resolve: [ResolveService] },
      { path: ':id/edit', component: RecipeEditComponent, resolve: [ResolveService] }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RecipeRouteModule { }
