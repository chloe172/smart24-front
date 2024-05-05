import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MjGestionProjetComponent } from './mj-gestion-projet.component';

describe('MjGestionProjetComponent', () => {
  let component: MjGestionProjetComponent;
  let fixture: ComponentFixture<MjGestionProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MjGestionProjetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MjGestionProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
