import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeJoueurComponent } from './badge-joueur.component';

describe('BadgeJoueurComponent', () => {
  let component: BadgeJoueurComponent;
  let fixture: ComponentFixture<BadgeJoueurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeJoueurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BadgeJoueurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
