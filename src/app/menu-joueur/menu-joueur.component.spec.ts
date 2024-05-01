import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuJoueurComponent } from './menu-joueur.component';

describe('MenuJoueurComponent', () => {
  let component: MenuJoueurComponent;
  let fixture: ComponentFixture<MenuJoueurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuJoueurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuJoueurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
