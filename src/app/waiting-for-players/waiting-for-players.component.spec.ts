import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingForPlayersComponent } from './waiting-for-players.component';

describe('WaitingForPlayersComponent', () => {
  let component: WaitingForPlayersComponent;
  let fixture: ComponentFixture<WaitingForPlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaitingForPlayersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WaitingForPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
