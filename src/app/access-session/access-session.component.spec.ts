import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessSessionComponent } from './access-session.component';

describe('AccessSessionComponent', () => {
  let component: AccessSessionComponent;
  let fixture: ComponentFixture<AccessSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessSessionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccessSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
