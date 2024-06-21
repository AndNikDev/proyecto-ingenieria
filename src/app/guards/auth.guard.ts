import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const isLoggedIn = this.authService.isLoggedIn();
    if (!isLoggedIn) {
      this.router.navigate(['/auth']);
    }
    return isLoggedIn;
  }
}

// canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//   const isLoggedIn = this.authService.isLoggedIn();
//   const role = this.authService.getRole();
//   const expectedRole = route.data.expectedRole;

//   if (!isLoggedIn || (expectedRole && role !== expectedRole)) {
//     this.router.navigate(['/auth']);
//     return false;
//   }
//   return true;
// }

// {
//   path: 'admin',
//   component: AdminComponent,
//   canActivate: [AuthGuard],
//   data: { expectedRole: 'admin' }
// }
