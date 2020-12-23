import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  constructor() { }

  @ViewChild('userForms') userForm: NgForm;

  @Output() addIngredientEvent = new EventEmitter<Ingredient>();

  onSubmit(){
    console.log(this.userForm.value);
    this.addIngredientEvent.emit(this.userForm.value);
  }

  ngOnInit(): void {
  }

}
