import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/* =========================
   INTERFACES
========================= */

export interface Lead {
  id: number;
  name: string;
  property: string;
  budget: number;
  status: string;
  createdAt: string;
}

export interface ApiCollection<T> {
  member: T[];
  totalItems: number;
}

@Injectable({
  providedIn: 'root',
})
export class LeadService {

  private http = inject(HttpClient);

  getLeads(): Observable<ApiCollection<Lead>> {

    return this.http.get<ApiCollection<Lead>>(
      'http://localhost:8080/api/leads'
    );

  }

}