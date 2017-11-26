import { Injectable } from '@angular/core';
import { LoginSession } from '../_models/loginsession';
import { User } from '../_models/user';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class LoginService {
  private loginUrl = "http://localhost:3000/public/login";
  
  constructor(private http: HttpClient) { }

  doLogin(user:User): Observable<LoginSession> {
    return this.http.post<LoginSession>(this.loginUrl, user, httpOptions).pipe(
      tap((loginSession: LoginSession) => console.log(`added session w/ token=${loginSession.content.token}`)),
      catchError(this.handleError<LoginSession>('login'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      console.log('got an error')
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // TODO: better job of transforming error for user consumption
     // this.log(`${operation} failed: ${error.message}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
