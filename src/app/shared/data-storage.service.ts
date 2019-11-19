import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { RecipeService } from '../recipe-book/recipe.service';
import { Recipe } from '../recipe-book/recipe-list/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })

export class DataStorageService {

    private baseUrl: string = 'https://recipe-project-599db.firebaseio.com/recipes.json';

    constructor(private _http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

    onSendingData = () => {
        this._http.put(this.baseUrl, this.recipeService.getRecipes(), { observe: 'response' }).subscribe((responseData) => {
            // console.log(responseData);
        }, error => {
            // console.log(error.message);
        })
    }

    onFetchingData = () => {
        return this._http.get<Recipe[]>(this.baseUrl, { responseType: 'json', observe: 'body' }).pipe(map((recipes: Recipe[]) => {
            return recipes.map(recipe => {
                return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
            })
        }), tap((recipes: Recipe[]) => {
            this.recipeService.setRecipes(recipes);
        }))
    }
}