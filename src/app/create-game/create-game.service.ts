import { Injectable } from '@angular/core';
import { WebSocketService } from '../core/WebSocketService/web-socket.service';
import { ConnexionService } from '../connexion/connexion.service';
import { Router } from '@angular/router';
import { IdPartieService } from '../general-services/id-partie.service';
import { Plateau } from '../modele/plateau.model';


@Injectable({
    providedIn: 'root'
})
export class CreateGameService {
    constructor(private webSocketService: WebSocketService,
                private connexionService: ConnexionService,
                private router: Router,
                private partieService : IdPartieService
    ) {
       
    }

    listerPlateaux(callback: (message: any) => any){
        if(this.connexionService.getUserAuthentication()){
            this.webSocketService.SendToType('listerPlateaux', {});
            this.webSocketService.subscribeToType('reponseListerPlateaux', (message) => {
                console.log('Liste des plateaux reçue', message);
                callback(message);
            });

        }
        else{
            this.router.navigate(['/login']);
        }
    }

    creerPartie(nomPartie: string, listePlateaux: Plateau[]){
        if(this.connexionService.getUserAuthentication()){
            const plateaux = listePlateaux.map(plateau => plateau.id);
            this.webSocketService.SendToType('creerPartie', {nomPartie, plateaux});
            this.webSocketService.subscribeToType('reponseCreerPartie', (message) => {
                console.log('Partie créée', message);
                if(!message.succes){
                    console.log(message.messageErreur);
                    this.router.navigate(['/error', message.codeErreur, message.messageErreur]);
                }
                else{
                    this.partieService.setId(message.data.idPartie);
                }    
            });
        }
        else{
            this.router.navigate(['/login']);
        }
    }

}