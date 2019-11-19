import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { RecipeService } from '../recipe-book/recipe.service';
import { ShoppingService } from '../shopping-list/shopping.service';
import { AuthInterceptorService } from '../auth/auth-interceptor.service';


@NgModule({
  providers: [
    RecipeService, 
    ShoppingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }]
})
export class CoreModule { }
  