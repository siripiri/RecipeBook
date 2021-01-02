import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { User } from './user.model';

interface AuthResponseDataForSignUp{
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

interface AuthResponseDataForLogIn{
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
}

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  constructor( private http: HttpClient) { }

  user = new BehaviorSubject<User>(null);
  token: string = null;
  private totalExpirationDate: any;

  signUp(email:string,password:string){
    return this.http.post<AuthResponseDataForSignUp>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAibZO7tYLgIS32-qo1z82Vy169NDsEPVM',{
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(
        error => {
          let errorMsg = 'An Unknown Error Occured';
          if(!error.error || !error.error.error){
            return throwError(errorMsg);
          }
          switch(error.error.error.message){
            case 'EMAIL_EXISTS':
              errorMsg = 'The email address is already in use by another account.';
              break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
              errorMsg = 'We have blocked all requests from this device due to unusual activity.';
              break;
          }
          return throwError(errorMsg);
        }
      ),
      tap( resData => {
        const expirationDate = new Date(new Date().getTime() + (+resData.expiresIn * 1000));
        const user = new User(resData.email, resData.localId, resData.idToken,expirationDate);
        this.user.next(user);
        localStorage.setItem('userData' , JSON.stringify(user));
      })
    );
  }

  login(email: string, password: string){
    return this.http.post<AuthResponseDataForLogIn>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAibZO7tYLgIS32-qo1z82Vy169NDsEPVM',{
      email : email,
      password: password,
      returnSecureToken: true
    }).pipe(
      catchError(
        error => {
          let errorMsg = 'An Unknown Error Occured';
          if(!error.error || !error.error.error){
            return throwError(errorMsg);
          }
          switch(error.error.error.message){
            case 'EMAIL_NOT_FOUND':
              errorMsg = 'There is no user record corresponding to this email.';
              break;
            case 'INVALID_PASSWORD':
              errorMsg = 'The password is invalid.';
              break;
          }
          return throwError(errorMsg);
        }
      ),
      tap( resData => {
        const expirationDate = new Date(new Date().getTime() + (+resData.expiresIn * 1000));
        const user = new User(resData.email, resData.localId, resData.idToken,expirationDate);
        this.user.next(user);
        this.autoLogOut(+resData.expiresIn * 1000);
        localStorage.setItem('userData' , JSON.stringify(user));
      })
    );
  }

  logOut(){
    this.user.next(null);
    localStorage.removeItem('userData');
    if(this.totalExpirationDate){
      clearTimeout(this.totalExpirationDate);
    }
    this.totalExpirationDate = null;
  }

  autoLogin(){
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if(!userData){
      return;
    }
    const loadedUser = new User(userData.email,userData.id,userData._token, new Date(userData._tokenExpirationDate));
    if(loadedUser.token){
      this.user.next(loadedUser);
      const expirationDuration =  new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      //this.autoLogOut(expirationDuration);
    }
  }

  autoLogOut(expirationDuration: number){
    console.log(expirationDuration);
    this.totalExpirationDate = setTimeout(() => {
      this.logOut();
    },expirationDuration);
  }
}
