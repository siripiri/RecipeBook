import { Component, OnInit, EventEmitter, Output, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() selectedFeature = new EventEmitter<string>();

  constructor(private dataStorageService : DataStorageService,private authService: AuthService, private router: Router) { }

  isAuthenticated = false;
  private userSub : Subscription;

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(
       (userData)  => {
         this.isAuthenticated = !!userData;
       }
    );
    console.log(this.isAuthenticated);
  }
  ngOnDestroy():void {
    this.userSub.unsubscribe();
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

  onLogOut(){
    this.authService.logOut();
    this.router.navigate(['/auth']);
  }

}
