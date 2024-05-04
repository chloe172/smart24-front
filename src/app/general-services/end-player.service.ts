import { Injectable } from '@angular/core';
import { WebSocketService } from '../core/WebSocketService/web-socket.service';
import { Partie } from '../modele/partie.model';
import { IdPartieService } from './id-partie.service';
import { AccessSessionService } from '../access-session/access-session.service';
import { Router } from '@angular/router';
import { ConnexionService } from '../connexion/connexion.service';


@Injectable({
    providedIn: 'root'
})
export class EndPlayerService {

    constructor(
        private webservice: WebSocketService,
        private accessSessionService: AccessSessionService,
        private partieService: IdPartieService,
        private connexionService : ConnexionService,
        private router: Router
    ) {
        this.endGamePlayer();
    }
      
    endGamePlayer(){
        if (this.accessSessionService.getUserAccessed()) { 
            this.webservice.subscribeToType('notificationMettreEnPausePartie', (message): any => {
                if (message.succes) {
                    console.log("service deco")
                    this.partieService.setId(-1);
                    this.accessSessionService.setUserAccessed(false);
                    this.router.navigate(['/']);
                } else {
                    console.log(message.messageErreur);
                    this.router.navigate(['/error', message.codeErreur, message.messageErreur]);
                }
            });
        }            
    }
}
