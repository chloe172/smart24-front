import { Injectable } from '@angular/core';
import { IdPartieService } from '../general-services/id-partie.service';
import { WebSocketService } from '../core/WebSocketService/web-socket.service';
import { Router } from '@angular/router';
import { Partie } from '../modele/partie.model';

@Injectable({
  providedIn: 'root',
})
export class OngoingGameCardService {
  constructor(
    private partieIdService: IdPartieService,
    private webService: WebSocketService,
    private router: Router
  ) {}

  reprendre(partie: Partie) {
    this.webService.SendToType('attendreEquipes', { idPartie: partie.id });
    console.log('Reprendre partie', partie);
    this.webService.subscribeToType('reponseAttendreEquipes', (message) => {
      console.log('Reponse attendre equipe', message);
      if (message.succes) {
        this.partieIdService.setPartie(partie);
        this.router.navigate(['/waiting']);
      } else {
        this.router.navigate([
          '/error',
          message.codeErreur,
          message.messageErreur,
        ]);
      }
    });
  }
}
