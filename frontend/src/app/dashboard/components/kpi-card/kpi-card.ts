import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  templateUrl: './kpi-card.html',
  styleUrl: './kpi-card.css',
})
export class KpiCardComponent {
  @Input() kpi!: any;
}
