import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', loadChildren: '../recipe-book/recipe/recipe.module#RecipeModule' }, // alternate method
  { path: 'shopping-list', loadChildren: () => import('../shopping-list/shopping/shopping.module').then(m => m.ShoppingModule) },
  { path: 'auth', loadChildren: () => import('../auth/auth/auth.module').then(m => m.AuthModule) },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/page-not-found' }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
