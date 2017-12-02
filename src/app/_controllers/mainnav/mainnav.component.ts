import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {NavItem} from '../../_models/nav-item';
import { NAVITEMS } from '../../nav-items';
import { LoginService } from '../../_services/login.service';

@Component({
  selector: 'app-mainnav',
  templateUrl: './mainnav.component.html',
  styleUrls: ['./mainnav.component.css']
})
export class MainnavComponent implements OnInit {

  private navItems:NavItem[];

  constructor(private router: Router, private loginService:LoginService) { }

  ngOnInit() {
    this.navItems = NAVITEMS;
  }

  logOut(){
      this.loginService.logout();
      this.router.navigate(['login']);
  }

}
