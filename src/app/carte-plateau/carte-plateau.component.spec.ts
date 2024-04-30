import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartePlateauComponent } from './carte-plateau.component';

describe('CartePlateauComponent', () => {
  let component: CartePlateauComponent;
  let fixture: ComponentFixture<CartePlateauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartePlateauComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartePlateauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
