import { Injectable } from '@angular/core';
import { WebSocketService } from '../core/WebSocketService/web-socket.service';
import { ConnexionService } from '../connexion/connexion.service';
import { Router } from '@angular/router';
import { AccessSessionService } from '../access-session/access-session.service';
import { IdPartieService } from '../general-services/id-partie.service';
import { Proposition } from "../modele/proposition.model";

@Injectable({
    providedIn: 'root'
})
export class QuestionPageService {

    constructor(
        private webservice: WebSocketService,
        private connexionService: ConnexionService,
        private accessSessionService: AccessSessionService,
        private partieService: IdPartieService,
        private router: Router
    ) {
    }

    InitMenuJoueur(callback: (message: any) => any) {
        // Equipe
        if (this.accessSessionService.getUserAccessed()) {

            this.webservice.subscribeToType('notificationReponseActivite', (message): any => {
                if (!message.succes) {
                    console.log(message.messageErreur);
                    this.router.navigate(['/error', message.codeErreur, message.messageErreur]);
                } else {
                    this.explication = message.data.explication;
                    callbackReponseActiviteEquipe(message);
                    // this.bonneProposition = message.data.bonneProposition as Proposition;
                }
            });

            this.webservice.subscribeToType("notificationTerminerExplication", (message) => {
                console.log("json reçu", message);
                if (message.succes) {
                    const partie = message.data.partie;
                    if (partie.finPlateau) {
                        // TODO : aller à la page de choix de plateau
                        callbackFinPlateau(message);
                    } 
                } else {
                    console.log(message.messageErreur);
                    this.router.navigate(['/error', message.codeErreur, message.messageErreur]);
                }
            });
        } else {
            this.router.navigate(['/']);
        }
    }

}