import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffenceComponent } from './offence.component';

describe('OffenceComponent', () => {
  let component: OffenceComponent;
  let fixture: ComponentFixture<OffenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffenceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OffenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
