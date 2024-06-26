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
  styleUrl: './waiting-for-players.component.scss',
})
export class WaitingForPlayersComponent {
  listeEquipes: Equipe[] = [];
  codePin?: string;

  constructor(
    private service: WaitingForPlayersService,
    private router: Router
  ) {
    this.codePin = service.getCodePin();
  }

  ngOnInit() {
    this.service.getEquipes((message) => {
      if (message.succes) {
        this.listeEquipes = message.data.listeEquipesConnectees as Equipe[];
      } else {
        this.router.navigate(['/']);
      }
    });
    this.service.ajouterEquipe((message) => {
      let equipe = message.data.equipe as Equipe;
      this.listeEquipes.push(equipe);
    });
    this.service.enleverEquipe((message) => {
      let equipe = message.data.equipe as Equipe;
      let index = this.getEquipeById(equipe.id);
      this.listeEquipes.splice(index, 1);

    });
    if (this.service.isPlayer()) {
      this.service.attendreDebutPartie((message) => {
        this.router.navigate(['/question']);
      });
    }
  }

  demarrer() {
    this.service.demarrerPartie();
  }

  playersConnected(): boolean {
    return !(this.listeEquipes.length === 0);
  }

  getEquipeById(id: number): number {
    let i = -1;
    this.listeEquipes.forEach((element, index) => {
      if (id === element.id) {
        i = index;
      }
    });
    return i;
  }

  isHost(): boolean {
    return this.service.isHost();
  }

  getAvatarPath(avatar: string): string {
    return "../assets/Avatar-pikisuperstar/"+avatar+".svg";
  }
}
