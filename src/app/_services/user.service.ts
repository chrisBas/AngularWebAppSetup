import { Injectable } from '@angular/core';
import { UserServiceResponse } from '../_models/user.response';
import { User } from '../_models/user.model';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {
  private baseUrl = "http://localhost:3000/";
  private pathLogin = "public/login";
  private pathSignup = "public/signup"
  
  constructor(private http: HttpClient) { }

  doLogin(user:User): Observable<UserServiceResponse> {
    return this.http.post<UserServiceResponse>(this.baseUrl+this.pathLogin, user, httpOptions)
      .pipe(
        map(response => response),
        catchError((error: any) => this.handleError(error))
      )
  }

  doSignup(user:User): Observable<UserServiceResponse> {
    return this.http.post<UserServiceResponse>(this.baseUrl+this.pathSignup, user, httpOptions)
      .pipe(
        map(response => response),
        catchError((error: any) => this.handleError(error))
      )
  }

  private handleError(error:any):Observable<any>{
    var userServiceResponse = new UserServiceResponse();
    userServiceResponse.isSuccess = false;
    userServiceResponse.message = error.statusText
    userServiceResponse.content = error.error;
    return of(userServiceResponse)
  }

  

}
