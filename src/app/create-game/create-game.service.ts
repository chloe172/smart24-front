import { Injectable } from '@angular/core';
import { WebSocketService } from '../core/WebSocketService/web-socket.service';
import { ConnexionService } from '../connexion/connexion.service';
import { Router } from '@angular/router';
import { PartieService } from '../general-services/partie.service';
import { Plateau } from '../modele/plateau.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CreateGameService {
  partyNameError: boolean = false;
  partyNameErrorMessage: string = '';
  constructor(
    private webSocketService: WebSocketService,
    private connexionService: ConnexionService,
    private router: Router,
    private partieService: PartieService,
    private snackBar: MatSnackBar
  ) { }

  listerPlateaux(callback: (message: any) => any) {
    if (this.connexionService.getUserAuthentication()) {
      this.webSocketService.SendToType('listerPlateaux', {});
      this.webSocketService.removeAllSubscriptionsOfType('reponseListerPlateaux');
      this.webSocketService.subscribeToType(
        'reponseListerPlateaux',
        (message) => {
          callback(message);
        }
      );
    } else {
      this.router.navigate(['/login']);
    }
  }

  creerPartie(nomPartie: string, listePlateaux: Plateau[]) {
    if (this.connexionService.getUserAuthentication()) {
      const plateaux = listePlateaux.map((plateau) => plateau.id);
      this.webSocketService.SendToType('creerPartie', { nomPartie, plateaux });
      this.webSocketService.removeAllSubscriptionsOfType('reponseCreerPartie');
      this.webSocketService.subscribeToType('reponseCreerPartie', (message) => {
        if (message.succes) {
          this.partieService.setPartie(message.data.partie);
          this.router.navigate(['/waiting']);
        } else {
          this.snackBar.open('Une erreur est survenue', 'OK');
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  getPartyErrorMessage(): string {
    return this.partyNameErrorMessage;
  }
  getPartyError(): boolean {
    return this.partyNameError;
  }
  resetPartyError() {
    this.partyNameError = false;
  }
}
