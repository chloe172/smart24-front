import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionPlateauxComponent } from './selection-plateaux.component';

describe('SelectionPlateauxComponent', () => {
  let component: SelectionPlateauxComponent;
  let fixture: ComponentFixture<SelectionPlateauxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectionPlateauxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectionPlateauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
