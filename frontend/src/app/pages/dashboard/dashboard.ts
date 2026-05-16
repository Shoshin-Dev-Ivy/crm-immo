import { Component, OnInit, inject } from '@angular/core';
import { NgFor } from '@angular/common';

import { KpiCardComponent } from '../../dashboard/components/kpi-card/kpi-card';
import { PipelineBoardComponent } from '../../dashboard/components/pipeline-board/pipeline-board';
import { RecentLeadsComponent } from '../../dashboard/components/recent-leads/recent-leads';
import { OverdueTasksComponent } from '../../dashboard/components/overdue-tasks/overdue-tasks';

import {
  LeadService,
  Lead
} from '../../core/services/lead';

/* =========================
   INTERFACES
========================= */

interface Kpi {
  label: string;
  value: string;
  icon: string;
}

interface Task {
  id: number;
  title: string;
  dueDate: string;
  leadName: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgFor,
    KpiCardComponent,
    PipelineBoardComponent,
    RecentLeadsComponent,
    OverdueTasksComponent,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements OnInit {

  private leadService = inject(LeadService);

  /* =========================
     KPI DYNAMIQUES
  ========================= */

  get kpis(): Kpi[] {

    return [
      {
        label: 'Leads actifs',
        value: this.leads.length.toString(),
        icon: '👥',
      },
      {
        label: 'Visites planifiées',
        value: this.leads
          .filter(l => l.status === 'VISIT')
          .length
          .toString(),
        icon: '🏠',
      },
      {
        label: 'Conversions',
        value: this.leads
          .filter(l => l.status === 'SIGNED')
          .length
          .toString(),
        icon: '📈',
      },
      {
        label: 'Tâches urgentes',
        value: this.tasks
          .filter(t => new Date(t.dueDate) < new Date())
          .length
          .toString(),
        icon: '⚠️',
      }
    ];

  }

  /* =========================
     FILTRE ACTIF
  ========================= */

  selectedFilter: string = 'ALL';

  /* =========================
     LEADS FILTRÉES
  ========================= */

  get filteredLeads(): Lead[] {

    if (this.selectedFilter === 'ALL') {
      return this.leads;
    }

    return this.leads.filter(
      lead => lead.status === this.selectedFilter
    );

  }

  /* =========================
     API LEADS
  ========================= */

  ngOnInit(): void {

  this.leadService.getLeads().subscribe({

    next: (data) => {

      this.leads = data.member;

    },

    error: () => {

      this.leads = [];

    }

  });

}

  /* =========================
     LEADS
  ========================= */

  leads: Lead[] = [];

  /* =========================
     TASKS
  ========================= */

  tasks: Task[] = [];

}