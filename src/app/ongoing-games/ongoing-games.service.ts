import { Injectable } from '@angular/core';
import { WebSocketService } from '../core/WebSocketService/web-socket.service';
import { ConnexionService } from '../connexion/connexion.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
    providedIn: 'root'
})
export class OngoingGamesService {
    constructor(
        private webservice: WebSocketService,
        private router: Router,
        private cookieservice : CookieService
    ) {
    }

    InitOngoingGames(callback: (message: any) => any){
        console.log("je passe ici",this.cookieservice.get("authentification"));
        if (this.cookieservice.get("authentification") == "true") {
            this.webservice.SendToType('listerParties', {});
            this.webservice.subscribeToType('reponseListerParties', (message): any => {
                callback(message);
            });

        }
        else {
            this.router.navigate(['/login']);            
        }
    }
}