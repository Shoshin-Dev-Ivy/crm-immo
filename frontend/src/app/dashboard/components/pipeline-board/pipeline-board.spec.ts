import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PipelineBoardComponent } from './pipeline-board';

describe('PipelineBoardComponent', () => {
  let component: PipelineBoardComponent;
  let fixture: ComponentFixture<PipelineBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PipelineBoardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PipelineBoardComponent);
    component = fixture.componentInstance;

    fixture.detectChanges(); // important pour @Input()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});