import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  isLogin = false;
  isLoading = false;
  error: string = null;
  
  ngOnInit(): void {
  }

  onSwitchMode(){
    this.isLogin = !this.isLogin;
  }

  onSubmit(form : NgForm){
    this.isLoading = true;
    if(this.isLogin){
      this.authService.login(form.value.email,form.value.password).subscribe(
        resData => {
          console.log(resData);
          this.isLoading = false;
          this.router.navigate(['/']);
        },
        error => {
          this.error = error;
          this.isLoading = false;
        }
      )
    }
    else{
      this.authService.signUp(form.value.email,form.value.password).subscribe( 
        resData => {
          console.log(resData);
          this.isLoading = false;
          this.router.navigate(['/recipes']);
        },
        errorMsg => {
          this.error = errorMsg;
          this.isLoading = false;
        }
      );
    }
    form.reset();
  }

}
