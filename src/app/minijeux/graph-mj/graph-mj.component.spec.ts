import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphMJComponent } from './graph-mj.component';

describe('GraphMJComponent', () => {
  let component: GraphMJComponent;
  let fixture: ComponentFixture<GraphMJComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphMJComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraphMJComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
