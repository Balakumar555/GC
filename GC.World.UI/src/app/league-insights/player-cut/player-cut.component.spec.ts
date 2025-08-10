import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerCutComponent } from './player-cut.component';

describe('PlayerCutComponent', () => {
  let component: PlayerCutComponent;
  let fixture: ComponentFixture<PlayerCutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerCutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayerCutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
