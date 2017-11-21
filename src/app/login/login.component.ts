import { Component, OnInit } from '@angular/core';
import { User } from "../user";
import { LoginService } from '../login.service';
import { LoginSession } from '../loginsession';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginSession: LoginSession;

  private user: User = {
    username:"",
    password: ""
  };
  private username: String = "";
  private password: String = "";

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  tryLogin() {
    if(this.validateUser){
      this.loginService.doLogin(this.user)
        .subscribe(loginSession => this.validateLogin(loginSession));
    }
  }

  private validateLogin(loginSession: LoginSession){
    this.loginSession = loginSession;
    if(this.loginSession.isLoggedIn){
      console.log("AM LOGGED IN");
      // TODO: NAVIGATE TO LOGGED IN PAGE
    } else {
      // TODO: DISPLAY INVALID CREDENTIALS
    }
  }

  private validateUser(): boolean{
    // TODO: VALIDATE USERNAME/PASSWORD ARE VALID
    // TODO: DISPLAY INVALID REASONINGS IF-NOT-VALID
    return true;
  }

}
