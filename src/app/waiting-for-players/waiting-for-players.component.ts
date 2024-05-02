import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Equipe } from '../modele/equipe.model';
import { WaitingForPlayersService } from './waiting-for-players.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-waiting-for-players',
  standalone: true,
  imports: [MatButtonModule, NgFor, MatCardModule],
  templateUrl: './waiting-for-players.component.html',
  styleUrl: './waiting-for-players.component.scss'
})
export class WaitingForPlayersComponent {
  listeEquipes: Equipe[] = [
    {
      id: 1, nom: "equipe1", score: 0,
      partie: undefined
    },
    {
      id: 2, nom: "equipe2", score: 0,
      partie: undefined
    },
    {
      id: 3, nom: "equipe3", score: 0,
      partie: undefined
    }
    
  ]
  constructor(private service : WaitingForPlayersService, private router : Router) { }


  ngOnInit(){
    this.service.ajouterEquipe((message) => {
       console.log("json reçu",message);
       if(!message.succes){
          console.log(message.messageErreur);
          this.router.navigate(['/error', message.codeErreur, message.messageErreur]);
       }else{
          let equipe = message.data as Equipe;
          this.listeEquipes.push(equipe);
       }
    });
  }

  demarrer(){
    this.service.demarrerPartie();
  }

  playersConnected(): boolean {
    return !(this.listeEquipes.length === 0);
  }
}
