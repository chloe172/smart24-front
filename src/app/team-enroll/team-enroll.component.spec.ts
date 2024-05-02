import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamEnrollComponent } from './team-enroll.component';

describe('TeamEnrollComponent', () => {
  let component: TeamEnrollComponent;
  let fixture: ComponentFixture<TeamEnrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamEnrollComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeamEnrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
