import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  public ingredients : Ingredient[];
  private changerSub : Subscription;
  
  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredient();
    this.changerSub = this.shoppingService.ingredientChanger
                        .subscribe(
                          (ingredients: Ingredient[]) => {this.ingredients = ingredients}
                        );
  }

  ngOnDestroy(): void{
    this.changerSub.unsubscribe();
  }

}
