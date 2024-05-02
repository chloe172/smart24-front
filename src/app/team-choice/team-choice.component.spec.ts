import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamChoiceComponent } from './team-choice.component';

describe('TeamChoiceComponent', () => {
  let component: TeamChoiceComponent;
  let fixture: ComponentFixture<TeamChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamChoiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeamChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
