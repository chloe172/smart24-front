import { Component, EventEmitter, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-popup-cyber',
  standalone: true,
  imports: [MatCardModule, MatIcon],
  templateUrl: './popup-cyber.component.html',
  styleUrl: './popup-cyber.component.scss'
})
export class PopupCyberComponent {
  score: number = -100;
  @Output() scoreEvent = new EventEmitter<number>();
  sendScore(reponse: boolean){
    if(reponse===true) {
      console.log("score",this.score);
      this.scoreEvent.emit(this.score);
    } else {
      console.log("score",0);
      this.scoreEvent.emit(0);
    }
    
  }
}
