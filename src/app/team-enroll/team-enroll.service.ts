import { Injectable } from '@angular/core';
import { WebSocketService } from '../core/WebSocketService/web-socket.service';
import { AccessSessionService } from '../access-session/access-session.service';
import { Router } from '@angular/router';
import { IdPartieService } from '../general-services/id-partie.service';

@Injectable({
    providedIn: 'root'
})
export class TeamEnrollService {
    idEquipe: number;
    teamNameError: boolean = false;
    teamNameErrorMessage: string = "";
    constructor(
        private webSocketService: WebSocketService,
        private accessSessionService: AccessSessionService,
        private idService : IdPartieService,
        private router : Router,
        
    ) {
        // Initialize your service here
        this.idEquipe = 0
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
                    if(message.codeErreur === 422){
                        this.teamNameError = true;
                        this.teamNameErrorMessage = message.messageErreur;
                    }
                    else{
                        this.router.navigate(['/error', message.codeErreur, message.messageErreur]);
                    }
                }
                else{
                    this.idEquipe = message.data.idEquipe;
                    console.log('Equipe inscrite', message);
                    this.router.navigate(['/waiting']);
                }
                
            });
        } else {
            console.log('User doesn\'t have access to this service');
            this.router.navigate(['/']);
            
        }
    }
    
    getIdEquipe() {
        this.idEquipe;
    }
    
    getTeamErrorMessage(): string {
        return this.teamNameErrorMessage;
    }
    getTeamError(): boolean {
        return this.teamNameError;
    }
}