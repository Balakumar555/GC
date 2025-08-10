import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StFormationsComponent } from './st-formations.component';

describe('StFormationsComponent', () => {
  let component: StFormationsComponent;
  let fixture: ComponentFixture<StFormationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StFormationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StFormationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
