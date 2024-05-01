import { Injectable } from '@angular/core';
import { WebSocketService } from '../core/WebSocketService/web-socket.service';
import { ConnexionService } from '../connexion/connexion.service';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})

export class SelectionPlateauxService{
    constructor(private webservice : WebSocketService,
                private connexionService: ConnexionService,
                private router: Router
    ){}

    InitSelectionPlateau(callback: (message: any) => any){
        if (this.connexionService.getUserAuthentication()) {
            this.webservice.SendToType('listerPlateauxPartie', {});
            this.webservice.subscribeToType('reponseListerPlateauxPartieListerParties', (message): any => {
                callback(message);
            });
        }
        else {
            this.router.navigate(['/login']);            
        }
    }
}