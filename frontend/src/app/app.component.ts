import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  feature: string = 'recipes';
  onNavigate(event: string){
    console.log(event);
    this.feature = event;
  }
}
