import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Equipe } from '../modele/equipe.model';
import { WaitingForPlayersService } from './waiting-for-players.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-waiting-for-players',
  standalone: true,
  imports: [MatButtonModule, NgFor, NgIf, MatCardModule],
  templateUrl: './waiting-for-players.component.html',
  styleUrl: './waiting-for-players.component.scss'
})
export class WaitingForPlayersComponent {
  listeEquipes: Equipe[] = []
  codePin : string ;
  constructor(private service : WaitingForPlayersService, private router : Router) { 
    this.codePin = service.getCodePin();
  }


  ngOnInit(){
    this.service.getEquipes((message) => {
        console.log("json reçu",message);
        if(!message.succes){
            console.log(message.messageErreur);
            this.router.navigate(['/error', message.codeErreur, message.messageErreur]);
        }else{
            this.listeEquipes = message.data.listeEquipes as Equipe[];
        }
      });
    this.service.ajouterEquipe((message) => {
       console.log("json reçu",message);
       if(!message.succes){
          console.log(message.messageErreur);
          this.router.navigate(['/error', message.codeErreur, message.messageErreur]);
       }else{
          let equipe = message.data.equipe as Equipe;
          this.listeEquipes.push(equipe);
       }
    });

    if(this.service.isPlayer()){
      this.service.attendreDebutPartie((message) => {
        if(!message.succes){
          console.log(message.messageErreur);
          this.router.navigate(['/error', message.codeErreur, message.messageErreur]);
       }else{
          this.router.navigate(['/question']);
       }
      });
    }
  }

  demarrer(){
    this.service.demarrerPartie();
  }

  playersConnected(): boolean {
    return !(this.listeEquipes.length === 0);
  }

  isHost(): boolean {
    return this.service.isHost();
  }
}
