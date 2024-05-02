import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NgStyle } from '@angular/common';
import { Router } from '@angular/router';
import { Proposition } from '../modele/proposition.model';
import { AccessSessionService } from '../access-session/access-session.service';
import { ActiviteEnCours } from '../modele/activiteEnCours.model';
import { IdPartieService } from '../general-services/id-partie.service';
import { TeamEnrollService } from '../team-enroll/team-enroll.service';
import { WebSocketService } from '../core/WebSocketService/web-socket.service';

@Component({
  selector: 'app-response',
  standalone: true,
  imports: [MatCardModule, NgStyle],
  templateUrl: './response.component.html',
  styleUrl: './response.component.scss'
})
export class ResponseComponent {
  @Input() proposition!: Proposition;
  @Input() idActiviteEnCours!: number;
  @Input() index!: number;
  @Input() isBonneReponse!: boolean;

  constructor(
    private accessSessionService: AccessSessionService,
    private equipeService: TeamEnrollService,
    private partieService: IdPartieService,
    private router: Router,
    private webservice: WebSocketService
  ) {
  }

  getColor(): string {
    const colors = ['#5ce1e6', '#ca5fe8', '#fbcd40', '#ff5353'];
    return colors[this.index % 4];
  }

  onClick() {
    if (this.accessSessionService.getUserAccessed()) {
      let idEquipe = this.equipeService.getIdEquipe();
      let idPartie = this.partieService.getId();
      let idActiviteEnCours = this.idActiviteEnCours;
      this.webservice.SendToType("soumettreReponse", {
        idPartie,
        "idProposition": this.proposition.id,
        idEquipe,
        idActiviteEnCours
      });

      this.webservice.subscribeToType('reponseSoumettreReponse', (message: any): any => {
        console.log("Question soumise", message);
        if (!message.succes) {
          console.log(message.messageErreur);
          this.router.navigate(['/error', message.codeErreur, message.messageErreur]);
        }
      });
      // TODO : unsubscribe à la destruction du composant
    }
  }

}
