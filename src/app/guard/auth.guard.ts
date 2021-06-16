import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthserviceService } from '../service/authservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  token: any;

  constructor(public auth: AuthserviceService, public router: Router) { }

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      // logged in so return true
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

}
