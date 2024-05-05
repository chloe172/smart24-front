import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { OngoingGameCardComponent } from '../ongoing-game-card/ongoing-game-card.component';
import { NgFor, NgIf } from '@angular/common';
import { OngoingGamesService } from './ongoing-games.service';
import { Partie } from '../modele/partie.model';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-ongoing-games',
  standalone: true,
  imports: [
    OngoingGameCardComponent,
    NgFor,
    NgIf,
    MatButtonModule,
    RouterModule,
    MatCardModule,
  ],
  templateUrl: './ongoing-games.component.html',
  styleUrl: './ongoing-games.component.scss',
})
export class OngoingGamesComponent implements OnInit {
  onGoingGames: Partie[] = [];
  router: Router = new Router();
  constructor(private service: OngoingGamesService) {}
  ngOnInit() {
    this.service.InitOngoingGames((message) => {
      console.log('json reçu', message);
      if (message.succes) {
        this.onGoingGames = message.data.listeParties as Partie[];
      }
    });
  }
}
