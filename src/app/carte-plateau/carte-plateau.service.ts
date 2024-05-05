import { Injectable } from '@angular/core';
import { WebSocketService } from '../core/WebSocketService/web-socket.service';
import { ConnexionService } from '../connexion/connexion.service';
import { Router } from '@angular/router';
import { PartieService } from '../general-services/partie.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CartePlateauService {
  constructor(
    private webSocketService: WebSocketService,
    private connexionService: ConnexionService,
    private router: Router,
    private partieService: PartieService,
    private snackBar: MatSnackBar
  ) {}

  choisirPlateauPartie(idPlateau: number) {
    if (this.connexionService.getUserAuthentication()) {
      const idPartie = this.partieService.getPartie()?.id;
      if (idPartie !== -1) {
        this.webSocketService.SendToType('choisirPlateau', {
          idPartie,
          idPlateau,
        });
        this.webSocketService.subscribeToType(
          'reponseChoisirPlateau',
          (message) => {
            console.log('Plateau choisi', message);
            if (!message.succes) {
              console.log(message.messageErreur);
              this.router.navigate([
                '/ongoing-games',
                message.codeErreur,
                message.messageErreur,
              ]);
            } else {
              this.router.navigate(['/question']);
            }
          }
        );
      } else {
        this.router.navigate(['/ongoing-games']);
        this.snackBar.open('Une erreur est survenue', 'OK');
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
}
