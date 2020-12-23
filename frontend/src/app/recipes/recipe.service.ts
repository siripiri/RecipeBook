import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from '../shopping-list/shopping.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe('A Sambar', 'This is simply a test', 'https://www.whiskaffair.com/wp-content/uploads/2020/05/Sambar-2-3.jpg',[new Ingredient('Drum Stick',1),new Ingredient('salt',1)]),
    new Recipe('A Browine with icecream', 'This is simply a test', 'https://www.oetker.in/Recipe/Recipes/oetker.in/in-en/dessert/image-thumb__52705__RecipeDetailsLightBox/brownie-with-vanilla-ice-cream.jpg',[new Ingredient('Browine',3),new Ingredient('vanilla icecream',2)])
  ];

  selectedRecipe = new EventEmitter<Recipe>();

  getRecipes(){
    /* Instead of reference it will send the new array with exact same copy of 
    an old recipe array*/
    return this.recipes.slice();
  }

  addToShoppingList(ingredients: Ingredient[]){
    this.shoppingService.fromShoppingList(ingredients)
  }

  constructor(private shoppingService: ShoppingService) { }
}
