import { Injectable } from '@angular/core';
import { WebSocketService } from '../core/WebSocketService/web-socket.service';

@Injectable({
  providedIn: 'root',
})
export class ConnexionService {
  userConnected: boolean;

  constructor(private webservice: WebSocketService) {
    this.userConnected = false;
  }

  authentify(user: string, password: string) {
    let message = { nom: user, mdp: password };
    this.webservice.SendToType('authentifierUtilisateur', message);
  }

  getAuthentication(callback: (message: any) => any) {
    this.webservice.removeAllSubscriptionsOfType('authentifierUtilisateur');
    this.webservice.subscribeToType(
      'reponseAuthentifierUtilisateur',
      (message): any => {
        callback(message);
      }
    );
  }

  setUserAuthenticated() {
    localStorage.setItem('type', 'MAITRE_DU_JEU');
  }

  getUserAuthentication() {
    return localStorage.getItem('type') === 'MAITRE_DU_JEU';
  }
}
