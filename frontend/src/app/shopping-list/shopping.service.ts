import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  ingredientChanger = new EventEmitter<Ingredient[]>();

  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];


  getIngredient(){
    return this.ingredients.slice();
  }
  addIngredient(ingredient: Ingredient){
    /* This will add in ingredient[] but it wont be send in getIngredient(). 
    This is because we just sending the copy or slice of the ingredient[] */
    this.ingredients.push(ingredient);

    this.ingredientChanger.emit(this.ingredients.slice());/* After emiting the data go to the places where getIngredient methode used
    and subcribe to that event so that when ever we change the data we can able 
    to send the new copy of data */
  }

  constructor() { }
}