import { Component, OnInit } from '@angular/core';
import { User } from "../../_models/user.model";
import { LoginService } from '../../_services/login.service';
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
  private isValidLastname = true;
  private invalidLastname:String;
  private isValidFirstname = true;  
  private invalidFirstname:String;
  
  private user: User = {
    username:"",
    password: "",
    firstname:"",
    lastname: ""
  };

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    if(this.loginService.isLoggedIn()){
      this.router.navigate(['auth/profile']);
    }
  }

  alternateLogin(){
    this.isLoggingIn = !this.isLoggingIn;
  }

  trySignup(){
    if(this.loginService.isLoggedIn()){
      this.router.navigate(['auth/profile']);
    } else {
      if(this.validateNewUser()){
        this.loginService.signup(this.user)
          .subscribe(
            boolResponse => {
              if(boolResponse) 
                this.router.navigate(['auth/profile'])
              this.invalidLogin = this.loginService.getStatusMessage()
              this.isValidLogin = false;
            }, error => {
              // TODO: FIND IF THIS EVER IS EXECUTED AND HANDLE
              console.error(error); 
            });
      }
    }
    return false;
  }

  tryLogin() {
    if(this.loginService.isLoggedIn()){
      this.router.navigate(['auth/profile']);
    } else {
      if(this.validateUser()){
        this.loginService.login(this.user)
          .subscribe(
            boolResponse => {
              if(boolResponse) 
                this.router.navigate(['auth/profile'])
              this.invalidLogin = this.loginService.getStatusMessage()
              this.isValidLogin = false;
            }, error => {
              // TODO: FIND IF THIS EVER IS EXECUTED AND HANDLE
              console.error(error); 
            });
      }
    }
    return false;
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

  private validateNewUser(): Boolean{
    var truthFlag:Boolean = this.validateUser();
    this.isValidLastname = true;
    this.isValidFirstname = true;

    if(this.user.firstname.length == 0){
      this.isValidFirstname = false;
      this.invalidFirstname = "A firstname is required";
      truthFlag = false;
    }
    if(this.user.lastname.length == 0 ){
      this.isValidLastname= false;
      this.invalidLastname = "A lastname is required";
      truthFlag = false;
    }
    
    return truthFlag;
  }

}
