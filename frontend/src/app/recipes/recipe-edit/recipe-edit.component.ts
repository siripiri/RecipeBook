import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  constructor(private route: ActivatedRoute,private recipeService : RecipeService, private router : Router) { }

  recipe : FormGroup;


  editIndex: number;
  editMode: boolean = false;
  editRecipe: Recipe;
  

  ngOnInit(): void {
    this.route.params
              .subscribe(
                (params: Params) => {
                  this.editIndex = +params['id'];
                  this.editMode = params['id'] != null;
                  this.editRecipe = this.recipeService.selectedRecipe(this.editIndex);
                }
              );
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let ingredients = new FormArray([]);
    if(this.editMode){
      recipeName = this.editRecipe.name;
      recipeImagePath = this.editRecipe.imagePath;
      recipeDescription = this.editRecipe.description;
      for(let ingredient of this.editRecipe.ingredients){
        let controls = new FormGroup({
          'name' : new FormControl(ingredient.name),
          'amount' : new FormControl(ingredient.amount)
        });
        ingredients.push(controls);
      }
    }

    this.recipe = new FormGroup({
      'name' : new FormControl(recipeName, [ Validators.required ]),
      'description': new FormControl(recipeDescription, [ Validators.required ]),
      'imagePath': new FormControl(recipeImagePath, [ Validators.required ]),
      'ingredients' : ingredients 
    });
  }


  addIngredient(){
    let controls = new FormGroup({
      'name': new FormControl('',[Validators.required]),
      'amount': new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
    });
    (<FormArray> this.recipe.get('ingredients')).push(controls);
  }

  removeIngredient(index: number){
    if(index > -1){
      (<FormArray> this.recipe.get('ingredients')).removeAt(index);
    }
  }

  onSubmit(){
    this.editRecipe = this.recipe.value;
    this.editMode ? this.recipeService.editRecipe(this.editIndex,this.editRecipe) : this.recipeService.addRecipe(this.editRecipe);
    if(this.editIndex >= -1){
      this.router.navigate(['../../',this.editIndex],{relativeTo: this.route});
    }
    else{
      this.router.navigate(['../'],{relativeTo: this.route});
    }
  }

  onCancel(){
    this.editMode = false;
    this.router.navigate(['../'],{relativeTo: this.route});
  }

}
