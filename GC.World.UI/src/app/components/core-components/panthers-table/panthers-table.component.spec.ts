import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanthersTableComponent } from './panthers-table.component';

describe('PanthersTableComponent', () => {
  let component: PanthersTableComponent;
  let fixture: ComponentFixture<PanthersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanthersTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanthersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
