import { Injectable } from '@angular/core';
import { WebSocketService } from '../core/WebSocketService/web-socket.service';
import { ConnexionService } from '../connexion/connexion.service';
import { Router } from '@angular/router';
import { PartieService } from '../general-services/partie.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root',
})

export class SelectionPlateauxService {
  constructor(private webservice: WebSocketService,
    private connexionService: ConnexionService,
    private router: Router,
    private partieService: PartieService,
    private snackbar: MatSnackBar
  ) { }

  InitSelectionPlateau(callback: (message: any) => any) {
    if (this.connexionService.getUserAuthentication()) {
      let partie = this.partieService.getPartie();
      if (partie) {
        this.webservice.SendToType('listerPlateauxPartie', {
          idPartie: partie.id,
        });
        this.webservice.removeAllSubscriptionsOfType('reponseListerPlateauxPartie');
        this.webservice.subscribeToType(
          'reponseListerPlateauxPartie',
          (message): any => {
            callback(message);
          }
        );
      } else {
        this.router.navigate(['/ongoing-games']);
        this.snackbar.open("La partie n'existe pas", 'OK');
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  mettreEnPause() {
    const idPartie = this.partieService.getPartie()?.id;
    this.webservice.SendToType("mettreEnPause", { idPartie });
    this.webservice.removeAllSubscriptionsOfType('reponseMettreEnPausePartie');
    this.webservice.subscribeToType('reponseMettreEnPausePartie', (message): any => {
      if (message.succes) {
        this.partieService.removePartie();
        this.webservice.removeAllSubscriptionsOfType('reponseLancerActivite');
        this.webservice.removeAllSubscriptionsOfType('notificationReponseActivite');
        this.webservice.removeAllSubscriptionsOfType('reponseTerminerExplication');
        this.webservice.removeAllSubscriptionsOfType('notificationSoumettreReponse');
        this.webservice.removeAllSubscriptionsOfType('reponseChoisirPlateau');
        this.webservice.removeAllSubscriptionsOfType('reponseListerParties');
        this.webservice.removeAllSubscriptionsOfType('reponseListerPlateaux');
        this.webservice.removeAllSubscriptionsOfType('reponseMettreEnPausePartie');
        this.webservice.removeAllSubscriptionsOfType('reponseListerPlateauxPartie');
        this.webservice.removeAllSubscriptionsOfType('notificationSoumettreScoreMinijeu');
        this.webservice.removeAllSubscriptionsOfType('reponseCreerPartie');
        this.webservice.removeAllSubscriptionsOfType('reponseTerminerPartie');
        this.webservice.removeAllSubscriptionsOfType('reponseTerminerMinijeu');
        this.webservice.removeAllSubscriptionsOfType('reponseListerEquipes');
        this.webservice.removeAllSubscriptionsOfType('reponseDemarrerPartie');
        this.router.navigate(['/ongoing-games']);
      } else {
        this.snackbar.open('Une erreur est survenue', 'OK');
      }
    });
  }

  obtenirClassement(callback: (message: any) => any) {
    const idPartie = this.partieService.getPartie()?.id;
    this.webservice.SendToType("obtenirClassementGeneral", { idPartie });
    this.webservice.removeAllSubscriptionsOfType('reponseObtenirClassementGeneral');
    this.webservice.subscribeToType('reponseObtenirClassementGeneral', (message): any => {
      if (!message.succes) {
        this.snackbar.open('Une erreur est survenue', 'OK');
      } else {
        callback(message);
      }
    });

  }
}
