import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: '<h1>TEST DASHBOARD</h1>',
})
export class DashboardComponent {

  constructor(private http: HttpClient) {

    console.log('BEFORE HTTP');

    this.http.get('http://localhost:8080/api/users')
      .subscribe({
        next: (res) => console.log('OK', res),
        error: (err) => console.error('ERROR', err),
      });

  }
}