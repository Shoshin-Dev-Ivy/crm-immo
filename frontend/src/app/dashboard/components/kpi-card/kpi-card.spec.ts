import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KpiCardComponent } from './kpi-card';

describe('KpiCardComponent', () => {
  let component: KpiCardComponent;
  let fixture: ComponentFixture<KpiCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KpiCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KpiCardComponent);
    component = fixture.componentInstance;

    fixture.detectChanges(); // 👈 important pour @Input
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});