import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueInsightsComponent } from './league-insights.component';

describe('LeagueInsightsComponent', () => {
  let component: LeagueInsightsComponent;
  let fixture: ComponentFixture<LeagueInsightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeagueInsightsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeagueInsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
