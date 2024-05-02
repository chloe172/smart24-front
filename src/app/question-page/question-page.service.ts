import { Injectable } from '@angular/core';
import { WebSocketService } from '../core/WebSocketService/web-socket.service';
import { ConnexionService } from '../connexion/connexion.service';
import { Router } from '@angular/router';
import { AccessSessionService } from '../access-session/access-session.service';
import { IdPartieService } from '../general-services/id-partie.service';
import { Proposition } from "../modele/proposition.model";
import { ActiviteEnCours } from "../modele/activiteEnCours.model";

@Injectable({
    providedIn: 'root'
})
export class QuestionPageService {
    idBonneProposition!: number;
    explication!: string;
    bonneProposition!: Proposition;

    constructor(
        private webservice: WebSocketService,
        private connexionService: ConnexionService,
        private accessSessionService: AccessSessionService,
        private partieService: IdPartieService,
        private router: Router
    ) {
    }

    InitQuestionPage(callbackLancementActivite: (message: any) => any,
        callbackReponseActivite: (message: any) => any) {
        // Maitre du jeu
        if (this.connexionService.getUserAuthentication()) {
            let idPartie = this.partieService.getId();
            this.webservice.SendToType("lancerActivite", { idPartie });

            this.webservice.subscribeToType('reponseLancerActivite', (message): any => {
                callbackLancementActivite(message);
            });

            this.webservice.subscribeToType('notificationSoumettreReponse', (message): any => {
                if (!message.succes) {
                    console.log(message.messageErreur);
                    this.router.navigate(['/error', message.codeErreur, message.messageErreur]);
                } else {
                    console.log("Soumission reponse d'une equipe", message);
                }
            });

            this.webservice.subscribeToType('notificationReponseActivite', (message): any => {
                if (!message.succes) {
                    console.log(message.messageErreur);
                    this.router.navigate(['/error', message.codeErreur, message.messageErreur]);
                } else {
                    callbackReponseActivite(message);
                }
            });
        
        // Equipe
        } else if (this.accessSessionService.getUserAccessed()) {

            this.webservice.subscribeToType('notificationLancerActivite', (message): any => {
                if (!message.succes) {
                    console.log(message.messageErreur);
                    this.router.navigate(['/error', message.codeErreur, message.messageErreur]);
                } else {
                    callbackLancementActivite(message);
                }
            });

            this.webservice.subscribeToType('notificationReponseActivite', (message): any => {
                if (!message.succes) {
                    console.log(message.messageErreur);
                    this.router.navigate(['/error', message.codeErreur, message.messageErreur]);
                } else {
                    callbackReponseActivite(message);
                    this.bonneProposition = message.data.bonneProposition as Proposition;
                }
            });
        } else {
            this.router.navigate(['/login']);
        }
    }

}