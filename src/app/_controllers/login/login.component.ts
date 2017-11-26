import { Component, OnInit } from '@angular/core';
import { User } from "../../_models/user";
import { LoginService } from '../../_services/login.service';
import { LoginSession } from '../../_models/loginsession';

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
    return false;
  }

  private validateLogin(loginSession: LoginSession){
    this.loginSession = loginSession;
    if(this.loginSession.content.token){
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
