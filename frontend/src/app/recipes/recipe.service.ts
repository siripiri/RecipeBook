import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from '../shopping-list/shopping.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipes : Recipe[] = [];

  recipeChanger = new Subject<Recipe[]>();

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipeChanger.next(this.recipes.slice());
  }

  selectedRecipe(id:number){
    return this.recipes.slice()[id];
  }

  getRecipes(){
    /* Instead of reference it will send the new array with exact same copy of 
    an old recipe array*/
    return this.recipes.slice();
  }

  addToShoppingList(ingredients: Ingredient[]){
    this.shoppingService.fromShoppingList(ingredients)
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipeChanger.next(this.recipes.slice());
  }

  editRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipeChanger.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    if(index > -1){
      this.recipes.splice(index,1);
      this.recipeChanger.next(this.recipes.slice());
    }
  }
  constructor(private shoppingService: ShoppingService) { }
}
