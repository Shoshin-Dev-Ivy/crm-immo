import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
} from '@angular/router';

import { JwtService } from '../core/jwt.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {

  constructor(
    private jwtService: JwtService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const expectedRoles = route.data['roles'] as string[];

    const userRoles = this.jwtService.getRoles();

    const hasRole = expectedRoles.some(role =>
      userRoles.includes(role)
    );

    if (hasRole) {
      return true;
    }

    this.router.navigate(['/dashboard']);

    return false;
  }
}