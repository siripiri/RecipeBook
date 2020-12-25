import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  ingredientChanger = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredientIndex(index : number){
    return this.ingredients[index];
  }

  getIngredient(){
    return this.ingredients.slice();
  }
  addIngredient(ingredient: Ingredient){
    /* This will add in ingredient[] but it wont be send in getIngredient(). 
    This is because we just sending the copy or slice of the ingredient[] */
    this.ingredients.push(ingredient);

    this.ingredientChanger.next(this.ingredients.slice());/* After emiting the data go to the places where getIngredient methode used
    and subcribe to that event so that when ever we change the data we can able 
    to send the new copy of data */
  }

  fromShoppingList(ingredients: Ingredient[]){
    //this.ingredients.push(... ingredients);
    for(let ingredient of ingredients){
      let index = this.ingredients.findIndex(item => item.name == ingredient.name);
      if(index >=0 ){
        this.ingredients[index].amount += ingredient.amount;
      }
      else{
        this.ingredients.push(ingredient);
      }
    }
    this.ingredientChanger.next(this.ingredients.slice());
  }

  updateIngredient(index: number,newIngredient: Ingredient){
    this.ingredients[index] = newIngredient;
    this.ingredientChanger.next(this.ingredients.slice());
  }
  

  deleteIngredient(index: number){
    if(index > -1){
      this.ingredients.splice(index,1);
      this.ingredientChanger.next(this.ingredients.slice());
    }
  }

  constructor() { }
}
