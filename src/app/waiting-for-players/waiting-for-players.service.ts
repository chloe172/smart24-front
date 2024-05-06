import { Injectable } from '@angular/core';
import { WebSocketService } from '../core/WebSocketService/web-socket.service';
import { ConnexionService } from '../connexion/connexion.service';
import { Router } from '@angular/router';
import { PartieService } from '../general-services/partie.service';
import { AccessSessionService } from '../access-session/access-session.service';
import { EndPlayerService } from '../general-services/end-player.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class WaitingForPlayersService {
  constructor(
    private webSocketService: WebSocketService,
    private connexionService: ConnexionService,
    private endPlayerService: EndPlayerService, //à ne pas enlever: doit être créer ici
    private accessSessionService: AccessSessionService,
    private partieService: PartieService,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  getCodePin() {
    return this.partieService.getPartie()?.codePin;
  }

  getEquipes(callback: (message: any) => any) {
    if (this.accessSessionService.getUserAccessed()) {
      let idPartie = this.partieService.getPartie()?.id;
      this.webSocketService.SendToType('listerEquipes', { idPartie });
      this.webSocketService.removeAllSubscriptionsOfType('reponseListerEquipes');
      this.webSocketService.subscribeToType(
        'reponseListerEquipes',
        (message) => {
          callback(message);
        }
      );
    }
  }

  ajouterEquipe(callback: (message: any) => any) {
    if (
      this.connexionService.getUserAuthentication() ||
      this.accessSessionService.getUserAccessed()
    ) {
      this.webSocketService.removeAllSubscriptionsOfType(
        'notificationInscrireEquipe'
      );
      this.webSocketService.subscribeToType(
        'notificationInscrireEquipe',
        (message) => {
          this.partieService.setPartie(message.data.partie);
          callback(message);
        }
      );
    } else {
      this.router.navigate(['/']);
    }
  }

  enleverEquipe(callback: (message: any) => any) {
    if (
      this.connexionService.getUserAuthentication() ||
      this.accessSessionService.getUserAccessed()
    ) {
      this.webSocketService.removeAllSubscriptionsOfType(
        'notificationDeconnexionEquipe'
      );
      this.webSocketService.subscribeToType(
        'notificationDeconnexionEquipe',
        (message) => {
          this.partieService.setPartie(message.data.partie);
          callback(message);
        }
      );
    } else {
      this.router.navigate(['/']);
    }
  }

  attendreDebutPartie(callback: (message: any) => void) {
    this.webSocketService.removeAllSubscriptionsOfType('notificationLancerActivite');
    this.webSocketService.removeAllSubscriptionsOfType('notificationReponseActivite');
    this.webSocketService.removeAllSubscriptionsOfType('notificationTerminerExplication');
    this.webSocketService.removeAllSubscriptionsOfType('reponseSoumettreReponse');
    this.webSocketService.removeAllSubscriptionsOfType('reponseSoumettreScoreMinijeu');
    this.webSocketService.removeAllSubscriptionsOfType('reponseTerminerMinijeu');
    this.webSocketService.removeAllSubscriptionsOfType('reponseDemarrerPartie');
    this.webSocketService.subscribeToType(
      'notificationChoisirPlateau',
      (message) => {
        callback(message);
      }
    );
  }

  demarrerPartie() {
    if (this.connexionService.getUserAuthentication()) {
      let idPartie = this.partieService.getPartie()?.id;
      if (idPartie !== -1) {
               
        this.webSocketService.SendToType('demarrerPartie', { idPartie });
        this.webSocketService.removeAllSubscriptionsOfType('reponseDemarrerPartie');
        this.webSocketService.subscribeToType('reponseDemarrerPartie', (message) => {

          if (message.succes) {
            this.router.navigate(['/selection']);
          } else {
            this.router.navigate(['/ongoing-games']);
            this.snackbar.open('Une erreur est survenue', 'OK');
          }
        });
      }
      else {
        this.router.navigate(['/ongoing-games']);
        this.snackbar.open('Partie introuvable', 'OK');
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  isHost(): boolean {
    return this.connexionService.getUserAuthentication();
  }

  isPlayer(): boolean {
    return this.accessSessionService.getUserAccessed();
  }
}
