import { Injectable } from '@angular/core';
import { WebSocketService } from '../core/WebSocketService/web-socket.service';
import { IdPartieService } from '../general-services/id-partie.service';
import { AccessSessionService } from '../access-session/access-session.service';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class TeamChoiceService {
    constructor(
        private webSocketService: WebSocketService,
        private idPartieService: IdPartieService,
        private router: Router,
        private accessService: AccessSessionService
    ) {
        // Initialize your service here
    }

    getEquipes(callback : (message: any) => any){
        if(this.accessService.getUserAccessed()){

            let idPartie = this.idPartieService.getId();
            this.webSocketService.SendToType('listerEquipes', {idPartie});
            console.log("idPartie", idPartie);
            this.webSocketService.subscribeToType('reponseListerEquipes', (message) => {
                console.log("json reçu",message);
                callback(message);
            });
        }
        else{
            this.router.navigate(['/']);
        }
    }

    connecterEquipe(idEquipe: number){
        if (this.accessService.getUserAccessed()) {
            let idPartie = this.idPartieService.getId();
            this.webSocketService.SendToType('rejoindrePartieEquipe', { idEquipe,idPartie});
            this.webSocketService.subscribeToType('reponseRejoindrePartieEquipe', (message) => {
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