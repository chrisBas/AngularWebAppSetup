import { Injectable } from '@angular/core';
import { LoginSession } from './loginsession';
import { User } from './user';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

// TODO, DONT HAVE MOCK SESSION
import { LOGINSESSION } from './mock-loginsession';

@Injectable()
export class LoginService {

  constructor() { }

  doLogin(user:User): Observable<LoginSession> {
    return of(LOGINSESSION); //TODO: MUST RETURN of(SOME ACTUAL VALUE, NOT A CLASSNAME)
  }

}
