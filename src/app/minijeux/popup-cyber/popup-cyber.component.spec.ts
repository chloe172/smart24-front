import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCyberComponent } from './popup-cyber.component';

describe('PopupCyberComponent', () => {
  let component: PopupCyberComponent;
  let fixture: ComponentFixture<PopupCyberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupCyberComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupCyberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
