import { Injectable } from '@angular/core';
import { WebSocketService } from '../core/WebSocketService/web-socket.service';
import { ConnexionService } from '../connexion/connexion.service';
import { Router } from '@angular/router';
import { IdPartieService } from '../general-services/id-partie.service';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
    providedIn: 'root'
})
export class CartePlateauService {
    constructor(private webSocketService: WebSocketService,
                private router: Router,
                private partieService : IdPartieService,
                private cookieservice : CookieService
    ) {
       
    }

    choisirPlateauPartie(idPlateau: number){
        if(this.cookieservice.get("authentification") === "true"){
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