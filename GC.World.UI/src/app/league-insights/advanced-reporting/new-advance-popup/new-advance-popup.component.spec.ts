import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAdvancePopupComponent } from './new-advance-popup.component';

describe('NewAdvancePopupComponent', () => {
  let component: NewAdvancePopupComponent;
  let fixture: ComponentFixture<NewAdvancePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewAdvancePopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewAdvancePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
