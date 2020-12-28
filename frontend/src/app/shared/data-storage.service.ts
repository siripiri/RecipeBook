import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http : HttpClient, private recipeService: RecipeService) { }

  storeRecipes(){
    const recipes = this.recipeService.getRecipes();
    return this.http.put('https://recipebook-40e67-default-rtdb.firebaseio.com/recipebook.json',recipes);
  }
  fetchRecipes(){
    return this.http.get<Recipe[]>('https://recipebook-40e67-default-rtdb.firebaseio.com/recipebook.json')
                    .pipe(
                      map(recipes => {
                        return recipes.map( recipe => {
                          return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
                        })
                      })
                    )
                    .subscribe(
                      (recipe) => {
                        this.recipeService.setRecipes(recipe);
                      }
                    );
  }
}
