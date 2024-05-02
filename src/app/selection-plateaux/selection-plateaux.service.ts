import { Injectable } from '@angular/core';
import { WebSocketService } from '../core/WebSocketService/web-socket.service';
import { ConnexionService } from '../connexion/connexion.service';
import { Router } from '@angular/router';
import { IdPartieService } from '../general-services/id-partie.service';


@Injectable({
    providedIn: 'root'
})

export class SelectionPlateauxService{
    constructor(private webservice : WebSocketService,
                private connexionService: ConnexionService,
                private router: Router,
                private partieService : IdPartieService
    ){}

    InitSelectionPlateau(callback: (message: any) => any){
        if (this.connexionService.getUserAuthentication()) {
            let idPartie = this.partieService.getId();
            if(idPartie !== -1){
                this.webservice.SendToType('listerPlateauxPartie', idPartie);
                this.webservice.subscribeToType('reponseListerPlateauxPartie', (message): any => {
                    callback(message);
                });
            }
            else{
                this.router.navigate(['/error', 404, "Partie introuvable"]);
            }
        }
        else {
            this.router.navigate(['/login']);            
        }
    }
}