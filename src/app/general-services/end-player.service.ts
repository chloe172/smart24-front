import { Injectable } from '@angular/core';
import { WebSocketService } from '../core/WebSocketService/web-socket.service';
import { IdPartieService } from './id-partie.service';
import { AccessSessionService } from '../access-session/access-session.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class EndPlayerService {
  constructor(
    private webservice: WebSocketService,
    private accessSessionService: AccessSessionService,
    private partieService: IdPartieService,
    private router: Router
  ) {
    this.endGamePlayer();
  }

  endGamePlayer() {
    if (this.accessSessionService.getUserAccessed()) {
      this.webservice.subscribeToType(
        'notificationMettreEnPausePartie',
        (message): any => {
          if (message.succes) {
            console.log('service deco');
            this.partieService.removePartie();
            this.accessSessionService.setUserAccessed(false);
            this.router.navigate(['/']);
          } else {
            console.log(message.messageErreur);
            this.router.navigate([
              '/error',
              message.codeErreur,
              message.messageErreur,
            ]);
          }
        }
      );
    }
  }
}
