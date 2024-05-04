import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CyberGameComponent } from './cyber-game.component';

describe('CyberGameComponent', () => {
  let component: CyberGameComponent;
  let fixture: ComponentFixture<CyberGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CyberGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CyberGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
