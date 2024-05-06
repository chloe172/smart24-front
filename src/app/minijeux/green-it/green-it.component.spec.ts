import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreenITComponent } from './green-it.component';

describe('GreenITComponent', () => {
  let component: GreenITComponent;
  let fixture: ComponentFixture<GreenITComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GreenITComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GreenITComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
