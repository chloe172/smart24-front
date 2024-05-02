import { Injectable } from '@angular/core';
import { WebSocketService } from '../core/WebSocketService/web-socket.service';
import { ConnexionService } from '../connexion/connexion.service';
import { Router } from '@angular/router';
import { IdPartieService } from '../general-services/id-partie.service';


@Injectable({
    providedIn: 'root'
})
export class WaitingForPlayersService {
    constructor(private webSocketService: WebSocketService,
                private connexionService: ConnexionService,
                private partieService: IdPartieService,
                private router: Router
    ) {
       
    }

    getCodePin(){
        return this.partieService.getCodePin();
    }

    ajouterEquipe(callback: (message: any) => any){
        if(this.connexionService.getUserAuthentication()){
            this.webSocketService.subscribeToType('notificationInscrireEquipe', (message) => {
                console.log('Equipe reçue', message);
                callback(message);
            });

        }
        else{
            this.router.navigate(['/login']);
        }
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

}