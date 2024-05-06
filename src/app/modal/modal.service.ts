import { Injectable } from '@angular/core';
import { WebSocketService } from '../core/WebSocketService/web-socket.service';
import { Partie } from '../modele/partie.model';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private webservice: WebSocketService) {}

  finishGame(partie: Partie, callback: (message: any) => any) {
    let idPartie = partie.id;
    this.webservice.SendToType('terminerPartie', { idPartie });
    this.webservice.removeAllSubscriptionsOfType('reponseTerminerPartie');
    this.webservice.subscribeToType('reponseTerminerPartie', (message): any => {
      callback(message);
    });
  }
}
