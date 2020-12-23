import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  

  constructor(private recipeService: RecipeService) { }

  recipes: Recipe[];

  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  selectedRecipe(recipe: Recipe){
    this.recipeWasSelected.emit(recipe);
  }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }

}
