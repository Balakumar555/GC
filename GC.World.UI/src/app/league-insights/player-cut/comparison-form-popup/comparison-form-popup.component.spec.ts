import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonFormPopupComponent } from './comparison-form-popup.component';

describe('ComparisonFormPopupComponent', () => {
  let component: ComparisonFormPopupComponent;
  let fixture: ComponentFixture<ComparisonFormPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComparisonFormPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComparisonFormPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
