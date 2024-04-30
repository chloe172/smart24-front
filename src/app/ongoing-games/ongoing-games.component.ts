import { Component } from '@angular/core';
import { OngoingGameCardComponent } from '../ongoing-game-card/ongoing-game-card.component';
import { NgFor } from '@angular/common';
import { Game } from '../ongoing-game-card/game.model';

@Component({
  selector: 'app-ongoing-games',
  standalone: true,
  imports: [OngoingGameCardComponent,NgFor],
  templateUrl: './ongoing-games.component.html',
  styleUrl: './ongoing-games.component.scss'
})
export class OngoingGamesComponent {
   OngoingGames : Game[] = [
    {  name : "partie1",
       lastWorld : 1,
       date : new Date(2024, 1, 12),
    },
    {  name : "partie2",
       lastWorld : 2,
       date : new Date(2024, 1, 12),
    }
    
   ]
   
}
