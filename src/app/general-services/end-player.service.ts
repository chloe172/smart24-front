import { Injectable } from '@angular/core';
import { WebSocketService } from '../core/WebSocketService/web-socket.service';
import { PartieService } from './partie.service';
import { AccessSessionService } from '../access-session/access-session.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class EndPlayerService {
  constructor(
    private webservice: WebSocketService,
    private accessSessionService: AccessSessionService,
    private partieService: PartieService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    this.endGamePlayer();
  }

  endGamePlayer() {
    if (this.accessSessionService.getUserAccessed()) {
      this.webservice.removeAllSubscriptionsOfType('notificationMettreEnPausePartie');
      this.webservice.subscribeToType(
        'notificationMettreEnPausePartie',
        (message): any => {
          console.log('service deco');
          this.partieService.removePartie();
          this.accessSessionService.setUserAccessed(false);
          this.router.navigate(['/']);
          this.snackbar.open(
            'La partie a été mise en pause par le maître du jeu',
            'OK'
          );
        }
      );
    }
  }
}
