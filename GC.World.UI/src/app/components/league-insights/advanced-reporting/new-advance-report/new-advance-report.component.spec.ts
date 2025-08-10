import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAdvanceReportComponent } from './new-advance-report.component';

describe('NewAdvanceReportComponent', () => {
  let component: NewAdvanceReportComponent;
  let fixture: ComponentFixture<NewAdvanceReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewAdvanceReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewAdvanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
