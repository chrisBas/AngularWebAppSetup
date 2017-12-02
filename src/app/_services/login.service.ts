import { Injectable } from '@angular/core';
import { UserServiceResponse } from '../_models/user.response';
import { User } from '../_models/user.model';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Token } from '../_models/token.model'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class LoginService {
  private baseUrl = "http://localhost:3000/";
  private pathLogin = "public/login";
  private pathSignup = "public/signup"

  private loginToken:Token;
  private statusMessage:String;
  
  constructor(private http: HttpClient) { }

  isLoggedIn():boolean{
    return (this.loginToken == null)?false:true;
  }

  login(user:User): Observable<boolean> {
    if(this.loginToken){
      this.setStatusMessage("User already logged in");
      return of(false);
    }
    return this.http.post<UserServiceResponse>(this.baseUrl+this.pathLogin, user, httpOptions)
      .pipe(
        map(response => this.validateLogin(response)),
        catchError((error: any) => this.handleError(error))
      )
  }

  logout():void {
    this.loginToken = null;
  }

  signup(user:User): Observable<boolean> {
    return this.http.post<UserServiceResponse>(this.baseUrl+this.pathSignup, user, httpOptions)
      .pipe(
        map(response => this.validateLogin(response)),
        catchError((error: any) => this.handleError(error))
      )
  }

  private validateLogin(userServiceResponse: UserServiceResponse):boolean{
    if(userServiceResponse.isSuccess){
      this.loginToken = (<Token>userServiceResponse.content);
      return true;
    } else {
      if((<any>userServiceResponse.content).status){
        this.setStatusMessage("Error occurred with service, please try again soon");
                // TODO: LOG SOMEWHERE FOR ANALYSIS
        return false;
      } else if ((<any>userServiceResponse.content).errno == 1062) {
        // USER IS ALREADY TAKEN
        this.setStatusMessage("Username is already taken")
        return false;
      }else {
        this.setStatusMessage(userServiceResponse.message);
        return false;        
      }
    }
  }

  private setStatusMessage(statusMessage:String):void {
    this.statusMessage = statusMessage;
  }
  public getStatusMessage():String {
    return this.statusMessage;
  }

  private handleError(error:any):Observable<any>{
    var userServiceResponse = new UserServiceResponse();
    userServiceResponse.isSuccess = false;
    userServiceResponse.message = error.statusText
    userServiceResponse.content = error.error;
    return of(userServiceResponse)
  }

  

}
