import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IAGameComponent } from './iagame.component';

describe('IAGameComponent', () => {
  let component: IAGameComponent;
  let fixture: ComponentFixture<IAGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IAGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IAGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
