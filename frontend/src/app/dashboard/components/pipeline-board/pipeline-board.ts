import { Component, Input, OnChanges } from '@angular/core';
import { DecimalPipe, NgFor } from '@angular/common';

import { LeadStatus } from '../../../core/types/lead-status.type';

import {
  Lead
} from '../../../core/services/lead';

import { LEAD_STATUS_LABEL } from '../../../core/mappers/lead-status.mapper';

@Component({
  selector: 'app-pipeline-board',
  standalone: true,
  imports: [NgFor, DecimalPipe],
  templateUrl: './pipeline-board.html',
  styleUrl: './pipeline-board.css',
})
export class PipelineBoardComponent implements OnChanges {

  protected readonly LEAD_STATUS_LABEL = LEAD_STATUS_LABEL;

  @Input() leads: Lead[] = [];

  grouped: Record<LeadStatus, Lead[]> = {
    NEW: [],
    CONTACTED: [],
    VISIT: [],
    NEGOTIATION: [],
    SIGNED: [],
    LOST: [],
  };

  statuses: LeadStatus[] = [
    'NEW',
    'CONTACTED',
    'VISIT',
    'NEGOTIATION',
    'SIGNED',
    'LOST',
  ];

  ngOnChanges(): void {
    this.groupLeads();
  }

  private groupLeads(): void {

    for (const status of this.statuses) {

      this.grouped[status] = this.leads.filter(
        lead => lead.status === status
      );

    }

  }

}