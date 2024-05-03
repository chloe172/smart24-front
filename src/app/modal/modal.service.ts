import { Injectable } from '@angular/core';
import { WebSocketService } from '../core/WebSocketService/web-socket.service';
import { ConnexionService } from '../connexion/connexion.service';
import { Partie } from '../modele/partie.model';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    constructor(
        private webservice: WebSocketService,
    ) {
    }

    finishGame(partie: Partie, callback: (message: any) => any){
        let idPartie = partie.id;
        this.webservice.SendToType('terminerPartie', {idPartie});
        this.webservice.subscribeToType('reponseTerminerPartie', (message): any => {
                callback(message);
            }); 

    }
}