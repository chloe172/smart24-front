import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingGameCardComponent } from './ongoing-game-card.component';

describe('OngoingGameCardComponent', () => {
  let component: OngoingGameCardComponent;
  let fixture: ComponentFixture<OngoingGameCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OngoingGameCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OngoingGameCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
