import { Component, Input } from '@angular/core';
import { NgFor, DecimalPipe } from '@angular/common';
import { Lead } from '../../../core/services/lead';

@Component({
  selector: 'app-recent-leads',
  standalone: true,
  imports: [NgFor, DecimalPipe],
  templateUrl: './recent-leads.html',
  styleUrl: './recent-leads.css'
})
export class RecentLeadsComponent {

  @Input() leads: Lead[] = [];

  get sortedLeads(): Lead[] {

    if (!this.leads || this.leads.length === 0) {
      return [];
    }

    return [...this.leads]
      .sort((a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
      )
      .slice(0, 5);
  }

  get isEmpty(): boolean {
    return this.sortedLeads.length === 0;
  }
}
