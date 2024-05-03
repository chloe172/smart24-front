import { Injectable } from '@angular/core';
import { WebSocketService } from '../core/WebSocketService/web-socket.service';
import { AccessSessionService } from '../access-session/access-session.service';
import { Router } from '@angular/router';
import { IdPartieService } from '../general-services/id-partie.service';

@Injectable({
    providedIn: 'root'
})
export class TeamEnrollService {
    constructor(
        private webSocketService: WebSocketService,
        private accessSessionService: AccessSessionService,
        private idService : IdPartieService,
        private router : Router
    ) {
        // Initialize your service here
    }

    verifyUser() {
        console.log('Verify user access');
        if (!this.accessSessionService.getUserAccessed()){
            console.log('User doesn\'t have access to this service');
            this.router.navigate(['/']);
        }
    }


    inscrireEquipe(nomEquipe: string) {
        if (this.accessSessionService.getUserAccessed()) {
            let idPartie = this.idService.getId();
            this.webSocketService.SendToType('inscrireEquipe', { nomEquipe,idPartie });
            this.webSocketService.subscribeToType('reponseInscrireEquipe', (message) => {
                if(!message.succes){
                    console.log('Erreur inscription', message);
                    this.router.navigate(['/error', message.codeErreur, message.messageErreur]);
                }
                else{
                    console.log('Equipe inscrite', message);
                    this.router.navigate(['/waiting']);
                }

            });
        } else {
            console.log('User doesn\'t have access to this service');
            this.router.navigate(['/']);

        }
    }

}