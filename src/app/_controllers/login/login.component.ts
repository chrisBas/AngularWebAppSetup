import { Component, OnInit } from '@angular/core';
import { User } from "../../_models/user.model";
import { UserService } from '../../_services/user.service';
import { UserServiceResponse } from '../../_models/user.response';
import { Token } from '../../_models/token.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private isLoggingIn = true;
  private isValidUsername = true;
  private invalidUsername:String;
  private isValidPassword = true;
  private invalidPassword:String;
  private isValidLogin = true;
  private invalidLogin:String;
  
  private user: User = {
    username:"",
    password: "",
    firstname:"",
    lastname: ""
  };

  constructor(private router: Router, private loginService: UserService) { }

  ngOnInit() {
    if(sessionStorage.getItem("globalJWT")){
      this.router.navigate(['profile']);
    }
  }

  alternateLogin(){
    this.isLoggingIn = !this.isLoggingIn;
  }

  trySignup(){
    console.log("signing up")
  }

  tryLogin() {
    if(sessionStorage.getItem("globalJWT")){
      this.router.navigate(['profile']);
    } else {
      if(this.validateUser()){
        this.loginService.doLogin(this.user)
          .subscribe(
            userServiceResponse => {
              this.validateLogin(userServiceResponse)
            }, error => {
              console.log(error); 
            });
      }
    }
    return false;
  }

  private validateLogin(userServiceResponse: UserServiceResponse){
    if(userServiceResponse.isSuccess){
      sessionStorage.setItem("globalJWT", (<Token>userServiceResponse.content).token.toString());
      this.router.navigate(['profile']);
    } else {
      if((<any>userServiceResponse.content).status){
        this.isValidLogin = false;
        this.invalidLogin = "Error occurred with service, please try again soon.";
        // TODO: LOG SOMEWHERE FOR ANALYSIS
      } else {
        this.isValidLogin = false;
        this.invalidLogin = userServiceResponse.message;
      }
    }
  }

  private validateUser(): Boolean{
    var truthFlag:Boolean = true;
    this.isValidUsername = true;
    this.isValidPassword = true;

    if(this.user.username.length < 4 ){
      this.isValidUsername = false;
      this.invalidUsername = "Username must be 5 or more characters"
      truthFlag = false;
    }
    if(this.user.password.length < 4 ){
      this.isValidPassword = false;
      this.invalidPassword = "Password must be 5 or more characters"
      truthFlag = false;
    }
    
    return truthFlag;
  }

}
