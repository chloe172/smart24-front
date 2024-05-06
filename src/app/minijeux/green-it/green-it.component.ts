import {Component, EventEmitter, Output} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-green-it',
  templateUrl: 'green-it.component.html',
  styleUrl: 'green-it.component.scss',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
})
export class GreenITComponent{

  @Output() scoreEvent = new EventEmitter<number>();

  valider() {
    this.scoreEvent.emit(0);
  }
}
