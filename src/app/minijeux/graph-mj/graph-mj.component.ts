import { CdkDrag } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-graph-mj',
  standalone: true,
  imports: [CdkDrag,MatCardModule],
  templateUrl: './graph-mj.component.html',
  styleUrl: './graph-mj.component.scss'
})
export class GraphMJComponent {

}
