import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  constructor(private recipeService: RecipeService,private route:ActivatedRoute,private router : Router) { }

  recipe:Recipe;
  id:number;

  ngOnInit(): void {
    // Using Params
    this.route.params
              .subscribe(
                (params: Params) => {
                  this.id =  +params['id'];
                  this.recipe = this.recipeService.selectedRecipe(this.id);
                }
              );
    // Using ParamMap
    /*this.route.paramMap
              .subscribe(
                (params: ParamMap)=>{
                  this.id = +params.get('id');
                  this.recipe = this.recipeService.selectedRecipe(this.id);
                }
              );*/
    console.log(this.id);
  }

  toShoppingList(){
    let clone = this.recipe.ingredients.map(a => ({...a}) );
    this.recipeService.addToShoppingList(clone);
  }

  toEditRecipe(){
    this.router.navigate(['../',this.id,'edit'],{relativeTo:this.route});
  }

}
