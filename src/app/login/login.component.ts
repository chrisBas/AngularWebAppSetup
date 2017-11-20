import { Component, OnInit } from '@angular/core';
import { User } from "../user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user: User = {
    username:"",
    password: ""
  };
  private username: String = "";
  private password: String = "";

  constructor() { }

  ngOnInit() {
  }

  tryLogin() {
    console.log(this.user);
  }

}
