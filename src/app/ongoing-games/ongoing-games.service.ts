import { Injectable } from '@angular/core';
import { WebSocketService } from '../core/WebSocketService/web-socket.service';
import { ConnexionService } from '../connexion/connexion.service';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class OngoingGamesService {
    constructor(
        private webservice: WebSocketService,
        private connexionService: ConnexionService,
        private router: Router
    ) {
    }

    InitOngoingGames(callback: (message: any) => any){
        if (this.connexionService.getUserAuthentication()) {
            this.webservice.SendToType('listerParties', {});
            console.log("envoyé");
            this.webservice.subscribeToType('reponseListerParties', (message): any => {
                console.log("reçu avant cb");
                callback(message);
            });

        }
        else {
            this.router.navigate(['/login']);            
        }
    }
}