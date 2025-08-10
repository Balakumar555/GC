import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedReportingComponent } from './advanced-reporting.component';

describe('AdvancedReportingComponent', () => {
  let component: AdvancedReportingComponent;
  let fixture: ComponentFixture<AdvancedReportingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvancedReportingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvancedReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
