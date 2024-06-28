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
  ): boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    const userRoles = this.authService.getRoles();
    const expectedRoles = route.data['expectedRole'] as number[];

    const hasRequiredRole = expectedRoles.some((role) =>
      userRoles.includes(role)
    );

    if (!hasRequiredRole) {
      alert('No tienes permisos para acceder a esta página');
      this.router.navigate(['/home']);
      return false;
    }
    if (!isLoggedIn || !hasRequiredRole) {
      this.router.navigate(['/auth']);
      console.log(userRoles, expectedRoles, isLoggedIn);
      return false;
    }

    return true;
  }
}
