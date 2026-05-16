import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtService } from '../core/jwt.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private api = 'http://localhost:8080/api';

  constructor(
    private http: HttpClient,
    private jwtService: JwtService
  ) {}

  login(email: string, password: string) {
    return this.http.post<any>(`${this.api}/login_check`, {
      email,
      password
    });
  }

  saveToken(token: string) {
    this.jwtService.setToken(token);
  }

  getToken(): string | null {
    return this.jwtService.getToken();
  }

  logout() {
    this.jwtService.clearToken();
  }

  isLogged(): boolean {
    return !!this.jwtService.getToken();
  }
}