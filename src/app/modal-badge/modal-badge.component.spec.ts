import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBadgeComponent } from './modal-badge.component';

describe('ModalBadgeComponent', () => {
  let component: ModalBadgeComponent;
  let fixture: ComponentFixture<ModalBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalBadgeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
