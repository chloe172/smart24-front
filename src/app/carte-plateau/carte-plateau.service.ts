import { Injectable } from '@angular/core';
import { WebSocketService } from '../core/WebSocketService/web-socket.service';
import { ConnexionService } from '../connexion/connexion.service';
import { Router } from '@angular/router';
import { IdPartieService } from '../general-services/id-partie.service';


@Injectable({
    providedIn: 'root'
})
export class CartePlateauService {
    constructor(private webSocketService: WebSocketService,
                private connexionService: ConnexionService,
                private router: Router,
                private partieService : IdPartieService
    ) {
       
    }

    choisirPlateauPartie(idPlateau: number){
        if(this.connexionService.getUserAuthentication()){
            const idPartie = this.partieService.getId();
            if(idPartie !== -1){
                this.webSocketService.SendToType('choisirPlateau', {idPartie, idPlateau});
                this.webSocketService.subscribeToType('reponseChoisirPlateau', (message) => {
                    console.log('Plateau choisi', message);
                    if(!message.succes){
                        console.log(message.messageErreur);
                        this.router.navigate(['/error', message.codeErreur, message.messageErreur]);
                    }
                    else{
                        this.router.navigate(['/question']);
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