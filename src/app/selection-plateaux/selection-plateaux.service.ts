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
  constructor(
    private webservice: WebSocketService,
    private connexionService: ConnexionService,
    private router: Router,
    private partieService: PartieService,
    private snackbar: MatSnackBar
  ) {}

  InitSelectionPlateau(callback: (message: any) => any) {
    if (this.connexionService.getUserAuthentication()) {
      let partie = this.partieService.getPartie();
      if (partie) {
        this.webservice.SendToType('listerPlateauxPartie', {
          idPartie: partie.id,
        });
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
    console.log('partie mise en pause');
    const idPartie = this.partieService.getPartie()?.id;
    this.webservice.SendToType('mettreEnPause', { idPartie });
    this.webservice.subscribeToType(
      'reponseMettreEnPausePartie',
      (message): any => {
        if (message.succes) {
          console.log('service deco');
          this.partieService.removePartie();
          this.router.navigate(['/ongoing-games']);
        } else {
          console.log(message.messageErreur);
          this.snackbar.open('Une erreur est survenue', 'OK');
        }
      }
    );
  }
}
