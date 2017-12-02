import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticateRoutingModule } from './authenticate-routing.module';

import { AuthenticateComponent } from './authenticate/authenticate.component';
import { ProfileComponent } from './_controllers/profile/profile.component'


import { AuthGuard } from './_services/auth-guard.service';

@NgModule({
  imports: [
    CommonModule,
    AuthenticateRoutingModule
  ],
  declarations: [
    AuthenticateComponent,
    ProfileComponent
  ],
  providers: [ AuthGuard ]
})
export class AuthenticateModule { }
