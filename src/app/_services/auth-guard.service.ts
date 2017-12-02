import { Injectable }     from '@angular/core';
import { CanActivateChild, CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot }    from '@angular/router';
import { LoginService } from '../_services/login.service'; 

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor( private router: Router, private loginService:LoginService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let url: string = state.url;
        if(this.loginService.isLoggedIn()){
            // TODO: MAKE THE ABOVE IF - AVAILABLE IN ONLY THE SERVICE
            return true;
        } else {
            // TODO: STORE URL IN SERVICE, HAVE SERVICE REDIRECT AFTER LOGIN
            this.router.navigate(['/login']);
            return false;
        }
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        return this.canActivate(route, state);
    }
}