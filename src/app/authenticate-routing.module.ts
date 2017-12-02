import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticateComponent } from './authenticate/authenticate.component';
import { ProfileComponent } from './_controllers/profile/profile.component';
import { AuthGuard } from './_services/auth-guard.service';


const authRoutes: Routes = [
  {
    path: 'auth',
    component: AuthenticateComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          { path: 'profile', component: ProfileComponent }
        ]
      }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthenticateRoutingModule { }
