import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  constructor(private recipeService: RecipeService) { }

  @Input() recipe:Recipe;

  ngOnInit(): void {
  }

  toShoppingList(){
    let clone = this.recipe.ingredients.map(a => ({...a}) );
    this.recipeService.addToShoppingList(clone);
  }

}
