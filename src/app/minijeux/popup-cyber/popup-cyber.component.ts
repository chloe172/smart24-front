import { Component, EventEmitter, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-popup-cyber',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './popup-cyber.component.html',
  styleUrl: './popup-cyber.component.scss'
})
export class PopupCyberComponent {
  score: number = -100;
  @Output() scoreEvent = new EventEmitter<number>();
  sendScore(){
    console.log("score",this.score);
    this.scoreEvent.emit(this.score);
  }
}
