import { CdkDrag } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-graph-mj',
  standalone: true,
  imports: [CdkDrag,MatCardModule,MatButtonModule],
  templateUrl: './graph-mj.component.html',
  styleUrl: './graph-mj.component.scss'
})
export class GraphMJComponent {
  @Output() scoreEvent = new EventEmitter<number>();

  valider(){
    this.scoreEvent.emit(0);
  }
}
