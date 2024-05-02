import { Injectable } from '@angular/core';
import { IdPartieService } from '../general-services/id-partie.service';
import { WebSocketService } from '../core/WebSocketService/web-socket.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class OngoingGameCardService {
    constructor(private partieIdService: IdPartieService,private webService : WebSocketService,private router : Router) {
        // Inject the PartieIdService into the OngoingGameCardService
    }

    reprendre(idPartie: number) {
        this.webService.SendToType('attendreEquipes', { idPartie });
        console.log('Reprendre partie', idPartie);
        this.webService.subscribeToType('reponseAttendreEquipes', (message) => {
            console.log('Reponse attendre equipe', message);
            this.partieIdService.setId(idPartie);
            if(message.succes){
                this.partieIdService.setCodePin(message.data.partie.codePin);
                this.router.navigate(['/waiting']);
            }
            else{
                this.router.navigate(['/error', message.codeErreur, message.messageErreur]);
            }
        });
        
        // Set the id of the current partie in the PartieIdService
    }
}