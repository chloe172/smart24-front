import { Injectable } from '@angular/core';
import { WebSocketService } from '../core/WebSocketService/web-socket.service';
import { ConnexionService } from '../connexion/connexion.service';
import { Router } from '@angular/router';
import { IdPartieService } from '../general-services/id-partie.service';
import { AccessSessionService } from '../access-session/access-session.service';


@Injectable({
    providedIn: 'root'
})
export class WaitingForPlayersService {
    constructor(private webSocketService: WebSocketService,
        private connexionService: ConnexionService,
        private accessSessionService: AccessSessionService,
        private partieService: IdPartieService,
        private router: Router
    ) {
        
    }
    
    getCodePin(){
        return this.partieService.getCodePin();
    }

    getEquipes(callback: (message: any) => any){
        if(this.connexionService.getUserAuthentication() || this.accessSessionService.getUserAccessed()){
            this.webSocketService.subscribeToType('listerEquipes', (message) => {
                console.log('Equipes reçues', message);
                callback(message);
            });
            
        } 
        else{
            this.router.navigate(['/']);
        }
    }
    
    ajouterEquipe(callback: (message: any) => any){
        console.log("passé dans ajouter équipe", this.accessSessionService.getUserAccessed());
        if(this.connexionService.getUserAuthentication() || this.accessSessionService.getUserAccessed()){
            console.log("passé dans ajouter équipe");
            this.webSocketService.subscribeToType('notificationInscrireEquipe', (message) => {
                console.log('Equipe reçue', message);
                callback(message);
            });
            
        } 
        else{
            this.router.navigate(['/']);
        }
    }
    
    attendreDebutPartie(callback: (message: any) => void) {
        this.webSocketService.subscribeToType('notificationChoisirPlateau', (message) => {
            console.log("choix du plateau effectué, démarrage partie...");
            callback(message);
        });  
    }

    demarrerPartie(){
        if(this.connexionService.getUserAuthentication()){
            let idPartie = this.partieService.getId();
            if(idPartie !== -1){

                this.webSocketService.SendToType('demarrerPartie', {idPartie});
                this.webSocketService.subscribeToType('reponseDemarrerPartie', (message) => {
                    console.log('Partie démarrée', message);
                    console.log(message.succes)
                    if(!message.succes){
                        console.log(message.messageErreur);
                        this.router.navigate(['/error', message.codeErreur, message.messageErreur]);
                    } 
                    else{
                        this.router.navigate(['/selection']);
                    }
                });
            }
            else{
                this.router.navigate(['/error', 404, "Partie introuvable"]);
            }
        }
        else{
            this.router.navigate(['/login']);
        }
    }

    isHost(): boolean {
        return this.connexionService.getUserAuthentication();
    }

    isPlayer(): boolean {
        return this.accessSessionService.getUserAccessed();
    }

}