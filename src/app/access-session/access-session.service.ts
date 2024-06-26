import { Injectable } from '@angular/core';
import { WebSocketService } from '../core/WebSocketService/web-socket.service';
import { PartieService } from '../general-services/partie.service';
import { Router } from '@angular/router';
import { Partie } from '../modele/partie.model';

@Injectable({
  providedIn: 'root',
})
export class AccessSessionService {
  userAccessed: boolean;
  constructor(
    private webservice: WebSocketService,
    private idPartieService: PartieService,
    private router: Router
  ) {
    this.userAccessed = false;
  }

  validerCodePin(pin: string, callback: (message: any) => any) {
    let message = { codePin: pin };
    this.webservice.SendToType('validerCodePin', message);
    this.webservice.removeAllSubscriptionsOfType('reponseValiderCodePin');
    this.webservice.subscribeToType('reponseValiderCodePin', (message): any => {
      callback(message);
    });
  }

  navigate(partie: Partie) {
    if (partie.etat === 'ATTENTE_EQUIPE_RECONNEXION') {
      this.idPartieService.setPartie(partie);
      this.setUserAccessed(true);
      this.router.navigate(['/team-choice']);
    } else if (partie.etat === 'ATTENTE_EQUIPE_INSCRIPTION') {
      this.idPartieService.setPartie(partie);
      this.setUserAccessed(true);
      this.router.navigate(['/team-enroll']);
    }
  }

  setUserAccessed(access: boolean) {
    if (access) {
      localStorage.setItem('type', 'EQUIPE');
    } else {
      localStorage.removeItem('type');
    }
  }

  getUserAccessed() {
    return localStorage.getItem('type') === 'EQUIPE';
  }
}
