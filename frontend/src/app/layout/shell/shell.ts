import { Component } from '@angular/core';
import { Router,RouterLink, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { JwtService } from '../../core/jwt.service';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [NgIf, RouterLink, RouterOutlet],
  templateUrl: './shell.html',
   styleUrls: ['./shell.css']
})
export class ShellComponent {

  constructor(
    public jwtService: JwtService,
    private router: Router
  ) {}

  logout(): void {
    this.jwtService.clearToken();
    this.router.navigate(['/login']);
  }
}
