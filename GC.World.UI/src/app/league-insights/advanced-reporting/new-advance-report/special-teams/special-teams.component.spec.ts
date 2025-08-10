import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialTeamsComponent } from './special-teams.component';

describe('SpecialTeamsComponent', () => {
  let component: SpecialTeamsComponent;
  let fixture: ComponentFixture<SpecialTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialTeamsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpecialTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
