import { Injectable } from '@angular/core';
import { WebSocketService } from '../core/WebSocketService/web-socket.service';
import { PartieService } from '../general-services/partie.service';
import { AccessSessionService } from '../access-session/access-session.service';
import { Router } from '@angular/router';
import { TeamEnrollService } from '../team-enroll/team-enroll.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class TeamChoiceService {
  constructor(
    private webSocketService: WebSocketService,
    private idPartieService: PartieService,
    private router: Router,
    private accessService: AccessSessionService,
    private teamService: TeamEnrollService,
    private snackbar: MatSnackBar
  ) {
    // Initialize your service here
  }

  getEquipes(callback: (message: any) => any) {
    if (this.accessService.getUserAccessed()) {
      let idPartie = this.idPartieService.getPartie()?.id;
      this.webSocketService.SendToType('listerEquipes', { idPartie });
      this.webSocketService.removeAllSubscriptionsOfType('reponseListerEquipes');
      this.webSocketService.subscribeToType(
        'reponseListerEquipes',
        (message) => {
          callback(message);
        }
      );
    } else {
      this.router.navigate(['/']);
    }
  }

  connecterEquipe(idEquipe: number) {
    if (this.accessService.getUserAccessed()) {
      let idPartie = this.idPartieService.getPartie()?.id;
      this.webSocketService.SendToType('rejoindrePartieEquipe', {
        idEquipe,
        idPartie,
      });
      this.webSocketService.removeAllSubscriptionsOfType('reponseRejoindrePartieEquipe');
      this.webSocketService.subscribeToType(
        'reponseRejoindrePartieEquipe',
        (message) => {
          if (message.succes) {
            this.teamService.setIdEquipe(message.data.equipe.id);
            this.router.navigate(['/waiting']);
          } else {
            let idPartie = this.idPartieService.getPartie()?.id;
            this.webSocketService.SendToType('listerEquipes', { idPartie });
            this.snackbar.open(message.messageErreur, 'OK');
          }
        }
      );
    } else {
      this.router.navigate(['/']);
    }
  }
}
