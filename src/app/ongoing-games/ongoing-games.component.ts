import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { OngoingGameCardComponent } from '../ongoing-game-card/ongoing-game-card.component';
import { NgFor } from '@angular/common';

import { OngoingGamesService } from './ongoing-games.service';
import { Partie } from '../modele/partie.model';


@Component({
  selector: 'app-ongoing-games',
  standalone: true,
  imports: [OngoingGameCardComponent, NgFor, MatButtonModule],
  templateUrl: './ongoing-games.component.html',
  styleUrl: './ongoing-games.component.scss'
})
export class OngoingGamesComponent implements OnInit{
   onGoingGames : Partie[] = [];
   constructor(private service : OngoingGamesService) { }
   ngOnInit(){
      this.service.InitOngoingGames((message) => {
         console.log("json reçu",message);
         if(!message.succes){
            console.log(message.messageErreur);
            //TODO : afficher un composant erreur
         }else{
            this.onGoingGames = message.data.listeParties as Partie[];
         }
      });
   }
   
   
}
