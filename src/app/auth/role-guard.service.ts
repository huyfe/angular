import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthserviceService } from '../service/authservice.service';
import jwt_decode from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {
  token: any;

  constructor(public auth: AuthserviceService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    //lay role duoc truong tai route
    const role = route.data.role;
    const token = this.auth.getToken();
    // decode the token to get its payload
    var tokenPayload: any;
    if (token) {
      tokenPayload = jwt_decode(token);
      console.log(tokenPayload.typeUser);

    }
    if (!this.auth.isAuthenticated() || tokenPayload.typeUser !== role) {
      this.router.navigate(['home']);
      return false;
    }
    return true;
  }

}
