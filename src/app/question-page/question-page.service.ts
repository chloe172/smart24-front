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
    idBonneProposition!: number;
    explication: string = "";
    bonneProposition!: Proposition;
    etape: "click" | "select" | "explication" = "click";

    constructor(
        private webservice: WebSocketService,
        private connexionService: ConnexionService,
        private accessSessionService: AccessSessionService,
        private partieService: IdPartieService,
        private router: Router
    ) {
    }

    InitQuestionPage(callbackLancementActivite: (message: any) => any,
        callbackReponseActiviteMaitreDuJeu: (message: any) => any,
        callbackReponseActiviteEquipe: (message: any) => any,
        callbackFinPlateau: (message: any) => any) {
        // Maitre du jeu
        if (this.connexionService.getUserAuthentication()) {
            let idPartie = this.partieService.getId();
            this.webservice.SendToType("lancerActivite", { idPartie });

            this.webservice.subscribeToType('reponseLancerActivite', (message): any => {
                this.etape = "click";
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
                    this.explication = message.data.explication;
                    callbackReponseActiviteMaitreDuJeu(message);
                }
            });

            this.webservice.subscribeToType("reponseTerminerExplication", (message) => {
                console.log("json reçu", message);
                if (message.succes) {
                    const partie = message.data.partie;
                    if (partie.finPlateau) {
                        // TODO : aller à la page de choix de plateau
                        this.explication = "";
                        this.router.navigate(['/selection']);
                        callbackFinPlateau(message);
                    } else {
                        const idPartie = this.partieService.idPartie;
                        this.webservice.SendToType("lancerActivite", { idPartie });
                        this.explication = "";
                    }
                } else {
                    console.log(message.messageErreur);
                    this.router.navigate(['/error', message.codeErreur, message.messageErreur]);
                }
            });

            // Equipe
        } else if (this.accessSessionService.getUserAccessed()) {

            this.webservice.subscribeToType('notificationLancerActivite', (message): any => {
                if (!message.succes) {
                    console.log(message.messageErreur);
                    this.router.navigate(['/error', message.codeErreur, message.messageErreur]);
                } else {
                    this.etape = "click";
                    callbackLancementActivite(message);
                }
            });

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
            this.router.navigate(['/login']);
        }
    }

}