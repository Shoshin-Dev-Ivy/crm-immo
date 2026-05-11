import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  email = '';
  password = '';

  loading = false;
  error = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.loading = true;
    this.error = '';

    this.auth.login(this.email, this.password).subscribe({
      next: (res) => {
        this.loading = false;

        if (!res?.token) {
          this.error = 'Token manquant';
          return;
        }

        this.auth.saveToken(res.token);

        this.router.navigate(['/dashboard']);
      },

      error: () => {
        this.loading = false;
        this.error = 'Identifiants invalides';
      },
    });
  }
}