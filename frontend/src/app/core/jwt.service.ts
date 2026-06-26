import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JwtService {

  private readonly TOKEN_KEY = 'token';

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  // 🟢 DECODAGE MINIMAL
  decodeToken(): any | null {
    const token = this.getToken();

    if (!token) return null;

    try {
      const payload = token.split('.')[1];

      return JSON.parse(atob(payload));

    } catch {
      return null;
    }
  }

  // 🟡 ROLES
  getRoles(): string[] {
    const decoded = this.decodeToken();

    return decoded?.roles ?? [];
  }

  // 🔴 EXPIRATION
  isTokenExpired(): boolean {

    const decoded = this.decodeToken();

    if (!decoded?.exp) return true;

    const now = Math.floor(Date.now() / 1000);

    return decoded.exp < now;
  }

  // 👤 USER COURANT
  getCurrentUser(): any | null {

    const decoded = this.decodeToken();

    if (!decoded) {
      return null;
    }

    return {
      email: decoded.username,
      roles: decoded.roles ?? [],
      exp: decoded.exp,
    };
  }

  // 🟦 UI HELPERS
  hasRole(role: string): boolean {
    const roles = this.getRoles();
    return roles.includes(role);
  }

  hasAnyRole(roles: string[]): boolean {
    const userRoles = this.getRoles();
    return roles.some(role => userRoles.includes(role));
  }
}