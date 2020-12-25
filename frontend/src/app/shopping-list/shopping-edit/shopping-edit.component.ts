import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  constructor(private shoppingService: ShoppingService) { }

  @ViewChild('userForms') userForm: NgForm;
  editIndex : number;
  subcription :Subscription;
  editMode :boolean = false;
  editIngredient: Ingredient;

  onSubmit(){
    this.editIngredient = this.userForm.value;
    if(this.editMode == true){
      this.shoppingService.updateIngredient(this.editIndex,this.editIngredient);
      this.editMode = false;
      this.userForm.reset();
    }
    else{
      this.shoppingService.addIngredient(this.userForm.value);
    }
  }

  ngOnInit(): void {
    this.subcription = this.shoppingService.startedEditing
                        .subscribe(
                          (data:number) => {
                            this.editIndex = data;
                            this.editMode = true;
                            this.editIngredient = this.shoppingService.getIngredientIndex(this.editIndex);
                            this.userForm.setValue({
                              name : this.editIngredient.name,
                              amount: this.editIngredient.amount
                            });
                          }
                        );
  }
  ngOnDestroy(): void{
    this.subcription.unsubscribe();
  }
  onClear(){
    this.userForm.reset();
    if(this.editMode == true){
      this.editMode = false;
    }
  }
  onDelete(){
    if(this.editMode){
      this.shoppingService.deleteIngredient(this.editIndex);
      this.editMode = false;
      this.userForm.reset();
    }
  }
}
