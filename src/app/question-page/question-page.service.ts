import { Injectable } from '@angular/core';
import { WebSocketService } from '../core/WebSocketService/web-socket.service';
import { ConnexionService } from '../connexion/connexion.service';
import { Router } from '@angular/router';
import { AccessSessionService } from '../access-session/access-session.service';
import { IdPartieService } from '../general-services/id-partie.service';
import { Proposition } from "../modele/proposition.model";
import { ProgressBarService } from '../progress-bar/progress-bar.service';
import { TeamEnrollService } from '../team-enroll/team-enroll.service';
import { Equipe } from '../modele/equipe.model'

@Injectable({
    providedIn: 'root'
})
export class QuestionPageService {
    idBonneProposition!: number;
    explication: string = "";
    score: string = "";
    rang: string = "";
    bonneProposition!: Proposition;
    equipes: Equipe[] = [];
    etape: "click" | "select" | "explication" = "click";
    
    constructor(
        private webservice: WebSocketService,
        private connexionService: ConnexionService,
        private accessSessionService: AccessSessionService,
        private partieService: IdPartieService,
        private progressBarService: ProgressBarService,
        private equipeService: TeamEnrollService,
        private router: Router
    ) {
    }
    
    InitQuestionPage(callbackLancementActivite: (message: any) => any,
        callbackReponseActiviteMaitreDuJeu: (message: any) => any,
        callbackReponseActiviteEquipe: (message: any) => any,
        callbackFinPlateauEquipe: (message: any) => any,
        callbackFinPlateauMaitreDuJeu: (message: any) => any) {

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
                    console.log(partie.finPlateau);
                    if (partie.finPlateau) {
                        this.explication = "";
                        callbackFinPlateauMaitreDuJeu(message);
                        this.webservice.removeAllSubscriptionsOfType('reponseLancerActivite');
                        this.webservice.removeAllSubscriptionsOfType('notificationReponseActivite');
                        this.webservice.removeAllSubscriptionsOfType('reponseTerminerExplication');
                        this.webservice.removeAllSubscriptionsOfType('reponseMettreEnPausePartie');
                        this.webservice.removeAllSubscriptionsOfType('notificationSoumettreReponse');
                        this.webservice.removeAllSubscriptionsOfType('reponseChoisirPlateau');
                        this.webservice.removeAllSubscriptionsOfType('reponseListerPlateau');
                        this.router.navigate(['/selection']);
                    } else {
                        const idPartie = this.partieService.getId();
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
                    this.score = "";
                    this.rang = "";
                    callbackLancementActivite(message);
                }
            });
            
            this.webservice.subscribeToType('notificationReponseActivite', (message): any => {
                if (!message.succes) {
                    console.log(message.messageErreur);
                    this.router.navigate(['/error', message.codeErreur, message.messageErreur]);
                } else {
                    console.log(message.equipe);
                    //this.explication = message.data.explication;  
                    this.score = message.data.equipe.score;
                    //this.rang = message.data.equipe.rang;
                    callbackReponseActiviteEquipe(message);
                }
            });
            
            this.webservice.subscribeToType("notificationTerminerExplication", (message) => {
                console.log("json reçu", message);
                if (message.succes) {
                    const partie = message.data.partie;
                    if (partie.finPlateau) {
                        // TODO : aller à la page de choix de plateau
                        callbackFinPlateauEquipe(message);
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
    
    envoyerReponse(idProposition: number, idActiviteEnCours : number) {
        let idEquipe = this.equipeService.getIdEquipe();
        let idPartie = this.partieService.getId();
        
        this.webservice.SendToType("soumettreReponse", {
            idPartie,
            idProposition,
            idEquipe,
            idActiviteEnCours
        });
    }
    
    recevoirSoumettreReponse(){
        this.webservice.removeAllSubscriptionsOfType('reponseSoumettreReponse');
        this.webservice.subscribeToType('reponseSoumettreReponse', (message: any): any => {
            console.log("Question soumise", message);
            if (!message.succes) {
                this.router.navigate(['/error', message.codeErreur, message.messageErreur]);
            }
        });
    }
    
    mettreEnPause(callback: () => any) {
        console.log("partie mise en pause");
        const idPartie = this.partieService.getId();
        this.webservice.SendToType("mettreEnPause", { idPartie });
        this.webservice.removeAllSubscriptionsOfType('reponseLancerActivite');
        this.webservice.removeAllSubscriptionsOfType('notificationReponseActivite');
        this.webservice.removeAllSubscriptionsOfType('reponseTerminerExplication');
        this.webservice.removeAllSubscriptionsOfType('reponseMettreEnPausePartie');
        this.webservice.removeAllSubscriptionsOfType('notificationSoumettreReponse');
        this.webservice.removeAllSubscriptionsOfType('reponseChoisirPlateau');
        this.webservice.removeAllSubscriptionsOfType('reponseListerPlateau');
        
        this.webservice.subscribeToType('reponseMettreEnPausePartie', (message): any => {
            if (message.succes) {
                console.log("service deco")
                this.partieService.setId(-1);
                callback();
            }
            else{
                console.log(message.messageErreur);
                this.router.navigate(['/error', message.codeErreur, message.messageErreur]);
            }
        });
       
    }
    
    getEquipe() {
        this.equipeService.getIdEquipe();
    }
    
    envoyerTerminerExplication() {
        const idPartie = this.partieService.getId();
        this.webservice.SendToType("terminerExplication", { idPartie });
        this.explication = "";
        this.webservice.subscribeToType('reponseTerminerExplication', (message): any => {
            if (!message.succes) {
                console.log(message.messageErreur);
                this.router.navigate(['/error', message.codeErreur, message.messageErreur]);
            }
        });

    }
    
    
}