import { Injectable } from '@angular/core';
import { PartieService } from '../general-services/partie.service';
import { WebSocketService } from '../core/WebSocketService/web-socket.service';
import { Router } from '@angular/router';
import { Partie } from '../modele/partie.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class OngoingGameCardService {
  constructor(
    private partieIdService: PartieService,
    private webService: WebSocketService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  reprendre(partie: Partie) {
    this.webService.SendToType('attendreEquipes', { idPartie: partie.id });
    console.log('Reprendre partie', partie);
    this.webService.removeAllSubscriptionsOfType('reponseAttendreEquipes');
    this.webService.subscribeToType('reponseAttendreEquipes', (message) => {
      console.log('Reponse attendre equipe', message);
      if (message.succes) {
        this.partieIdService.setPartie(partie);
        this.router.navigate(['/waiting']);
      } else {
        this.snackbar.open('Une erreur est survenue', 'OK');
      }
    });
  }
}
