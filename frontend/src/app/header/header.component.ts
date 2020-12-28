import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() selectedFeature = new EventEmitter<string>();

  constructor(private dataStorageService : DataStorageService) { }

  ngOnInit(): void {
    
  }

  onSelect(feature: string){
      this.selectedFeature.emit(feature);
  }

  saveData(){
    this.dataStorageService.storeRecipes()
                            .subscribe(
                              (data) => {
                                console.log(data);
                              },
                              (error) => {
                                console.log(error);
                              }
                            );
  }

  fetchData(){
    this.dataStorageService.fetchRecipes().subscribe((data)=> console.log(data),(error)=>console.log(error.message));
  }

}
