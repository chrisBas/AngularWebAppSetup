import { Component, OnInit } from '@angular/core';

import {NavItem} from '../../_models/nav-item';
import { NAVITEMS } from '../../nav-items';

@Component({
  selector: 'app-mainnav',
  templateUrl: './mainnav.component.html',
  styleUrls: ['./mainnav.component.css']
})
export class MainnavComponent implements OnInit {

  private navItems:NavItem[];

  constructor() { }

  ngOnInit() {
    this.navItems = NAVITEMS;
  }

}
