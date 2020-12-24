import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  constructor(private router: Router,private route:ActivatedRoute) { }

  @Input() recipe: Recipe;
  @Input() index:number;

  onSelect(){
    this.router.navigate(['/recipes/',this.index],{relativeTo:this.route});
  }

  ngOnInit(): void {
  }

}
