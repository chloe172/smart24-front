import { Injectable } from '@angular/core';
import { WebSocketService } from '../core/WebSocketService/web-socket.service';
import { AccessSessionService } from '../access-session/access-session.service';
import { Router } from '@angular/router';
import { PartieService } from '../general-services/partie.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class TeamEnrollService {
  idEquipe: number;
  teamNameError: boolean = false;
  teamNameErrorMessage: string = '';

  constructor(
    private webSocketService: WebSocketService,
    private accessSessionService: AccessSessionService,
    private idService: PartieService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    this.idEquipe = 0;
  }

  verifyUser() {
    if (!this.accessSessionService.getUserAccessed()) {
      this.router.navigate(['/']);
    }
  }

  inscrireEquipe(nomEquipe: string, avatar: string) {
    if (this.accessSessionService.getUserAccessed()) {
      let idPartie = this.idService.getPartie()?.id;
      this.webSocketService.SendToType('inscrireEquipe', {
        nomEquipe,
        idPartie,
        avatar,
      });
      this.webSocketService.removeAllSubscriptionsOfType('reponseInscrireEquipe');
      this.webSocketService.subscribeToType(
        'reponseInscrireEquipe',
        (message) => {
          if (message.succes) {
            this.idEquipe = message.data.equipe.id;
            this.router.navigate(['/waiting']);
          } else {
            if (message.codeErreur === 422) {
              this.teamNameError = true;
              this.teamNameErrorMessage = message.messageErreur;
            } else {
              this.router.navigate(['/']);
              this.snackbar.open('Une erreur est survenue', 'OK');
            }
          }
        }
      );
    } else {
      this.router.navigate(['/']);
    }
  }

  getIdEquipe() {
    this.idEquipe;
  }

  setIdEquipe(id: number) {
    this.idEquipe = id;
  }

  getTeamErrorMessage(): string {
    return this.teamNameErrorMessage;
  }
  getTeamError(): boolean {
    return this.teamNameError;
  }
}
