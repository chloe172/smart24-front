import { Component, Input } from '@angular/core';
import { Game } from './game.model';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ongoing-game-card',
  standalone: true,
  templateUrl: './ongoing-game-card.component.html',
  styleUrl: './ongoing-game-card.component.scss',
  imports: [MatCardModule,MatButtonModule,DatePipe]
})
export class OngoingGameCardComponent {
  
  @Input() game!: Game;

  constructor() {
    }

}
