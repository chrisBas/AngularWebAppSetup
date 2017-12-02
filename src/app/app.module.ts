import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticateModule } from './authenticate.module';

import { LoginService } from './_services/login.service';

import { AppComponent } from './_controllers/app/app.component';
import { LoginComponent } from './_controllers/login/login.component';
import { HomeComponent } from './_controllers/home/home.component';
import { MainnavComponent } from './_controllers/mainnav/mainnav.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MainnavComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AuthenticateModule,    
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
