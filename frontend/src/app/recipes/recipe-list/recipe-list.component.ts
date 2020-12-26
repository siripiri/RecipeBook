import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  

  constructor(private recipeService: RecipeService,private router: Router,private route: ActivatedRoute) { }

  recipes: Recipe[];
  recipeSub : Subscription;

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.recipeSub = this.recipeService.recipeChanger
                                        .subscribe(
                                          (recipes : Recipe[]) => {
                                            this.recipes = recipes;
                                          }
                                        );
  }

  ngOnDestroy(): void {
    this.recipeSub.unsubscribe();
  }

  addRecipe(){
    this.router.navigate(['new'],{relativeTo: this.route});
  }

}
