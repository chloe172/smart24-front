import { Injectable } from '@angular/core';
import { WebSocketService } from '../core/WebSocketService/web-socket.service';
import { ConnexionService } from '../connexion/connexion.service';
import { Router } from '@angular/router';
import { AccessSessionService } from '../access-session/access-session.service';
import { PartieService } from '../general-services/partie.service';
import { Proposition } from '../modele/proposition.model';
import { ProgressBarService } from '../progress-bar/progress-bar.service';
import { TeamEnrollService } from '../team-enroll/team-enroll.service';
import { Equipe } from '../modele/equipe.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class QuestionPageService {
  idBonneProposition!: number;
  explication: string = "";
  score: number | null = null;
  avatar: string ='';
  rang: string = "";
  finPlateau: boolean = true;
  bonneProposition!: Proposition;
  equipes: Equipe[] = [];
  etape: "click" | "select" | "explication" = "click";

  constructor(
    private webservice: WebSocketService,
    private accessSessionService: AccessSessionService,
    private connexionService: ConnexionService,
    private partieService: PartieService,
    private progressBarService: ProgressBarService,
    private equipeService: TeamEnrollService,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  InitQuestionPage(
    callbackLancementActivite: (message: any) => any,
    callbackReponseActiviteMaitreDuJeu: (message: any) => any,
    callbackReponseActiviteEquipe: (message: any) => any,
    callbackFinPlateauEquipe: (message: any) => any,
    callbackFinPlateauMaitreDuJeu: (message: any) => any,
    callbackNotificationMiniJeuMaitreDuJeu: (message: any) => any
  ) {
    // Maitre du jeu
    if (this.connexionService.getUserAuthentication()) {
      let idPartie = this.partieService.getPartie()?.id;
      this.webservice.SendToType("lancerActivite", { idPartie });
      this.webservice.removeAllSubscriptionsOfType('reponseLancerActivite');
      this.webservice.subscribeToType(
        'reponseLancerActivite',
        (message): any => {
          this.etape = "click";

          callbackLancementActivite(message);
        }
      );
      this.webservice.removeAllSubscriptionsOfType('notificationSoumettreReponse');
      this.webservice.subscribeToType(
        'notificationSoumettreReponse',
        (message): any => {
          console.log(message);
        }
      );
      this.webservice.removeAllSubscriptionsOfType('notificationSoumettreScoreMinijeu');
      this.webservice.subscribeToType('notificationSoumettreScoreMinijeu', (message): any => {
        callbackNotificationMiniJeuMaitreDuJeu(message);
        console.log("Soumission mini jeu d'une equipe", message);
      });

      this.webservice.removeAllSubscriptionsOfType('notificationReponseActivite');
      this.webservice.subscribeToType(
        'notificationReponseActivite',
        (message): any => {
          this.explication = message.data.explication;
          callbackReponseActiviteMaitreDuJeu(message);
        }
      );

      this.webservice.removeAllSubscriptionsOfType('reponseTerminerExplication');
      this.webservice.subscribeToType(
        "reponseTerminerExplication",
        (message) => {
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
              this.webservice.removeAllSubscriptionsOfType('reponseListerParties');
              this.webservice.removeAllSubscriptionsOfType('reponseListerPlateaux');
              this.webservice.removeAllSubscriptionsOfType('reponseListerPlateauxPartie');
              this.webservice.removeAllSubscriptionsOfType('notificationSoumettreScoreMinijeu');
              this.webservice.removeAllSubscriptionsOfType('reponseCreerPartie');
              this.webservice.removeAllSubscriptionsOfType('reponseTerminerPartie');
              this.webservice.removeAllSubscriptionsOfType('reponseTerminerMinijeu');
              this.webservice.removeAllSubscriptionsOfType('reponseListerEquipes');
              this.webservice.removeAllSubscriptionsOfType('reponseDemarrerPartie');
              this.router.navigate(['/selection']);
            } else {
              const idPartie = this.partieService.getPartie()?.id;
              this.webservice.SendToType("lancerActivite", { idPartie });
              this.explication = "";
            }
          } else {
            console.log(message.messageErreur);
          }
        }
      );

      // Equipe
    } else if (this.accessSessionService.getUserAccessed()) {
      this.webservice.subscribeToType(
        'notificationLancerActivite',
        (message): any => {
          this.etape = 'click';
          this.score = null;
          this.avatar = '';
          this.rang = '';
          this.finPlateau = false;
          callbackLancementActivite(message);
        }
      );

      this.webservice.subscribeToType(
        'notificationReponseActivite',
        (message): any => {
          console.log(message.data.equipe);
          this.score = message.data.equipe.score;
          this.avatar = message.data.equipe.avatar;
          callbackReponseActiviteEquipe(message);
        }
      );

      this.webservice.subscribeToType(
        'notificationTerminerExplication',
        (message) => {
          console.log('json reçu', message);
          const partie = message.data.partie;
          if (partie.finPlateau) {
            callbackFinPlateauEquipe(message);
            this.finPlateau = true;
          }
        }
      );
    } else {
      this.router.navigate(['/']);
    }
  }

  envoyerReponse(idProposition: number, idActiviteEnCours: number) {
    let idEquipe = this.equipeService.getIdEquipe();
    let idPartie = this.partieService.getPartie()?.id;

    this.webservice.SendToType("soumettreReponse", {
      idPartie,
      idProposition,
      idEquipe,
      idActiviteEnCours,
    });
  }

  recevoirSoumettreReponse() {
    this.webservice.removeAllSubscriptionsOfType('reponseSoumettreReponse');
    this.webservice.subscribeToType(
      'reponseSoumettreReponse',
      (message: any): any => {
        console.log("Question soumise", message);
        if (!message.succes) {
          this.snackbar.open('Une erreur est survenue', 'OK');
        }
      }
    );
  }

  sendScoreMinijeu($event: any, idActiviteEnCours: number) {
    let score = $event;
    this.webservice.SendToType("soumettreScoreMinijeu", { score, idActiviteEnCours });
    this.webservice.removeAllSubscriptionsOfType('reponseSoumettreScoreMinijeu');
    this.webservice.subscribeToType('reponseSoumettreScoreMinijeu', (message: any): any => {
      console.log("score mj soumis", message);
      if (!message.succes) {
        this.snackbar.open('Une erreur est survenue', 'OK');
      }
    });
  }

  envoyerTerminerMinijeu() {
    let idPartie = this.partieService.getPartie()?.id;
    this.webservice.SendToType("terminerMinijeu", { idPartie });
    this.webservice.removeAllSubscriptionsOfType('reponseTerminerMinijeu');
    this.webservice.subscribeToType('reponseTerminerMinijeu', (message: any): any => {
      console.log("terminer mj envoyé", message);
      if (!message.succes) {
        this.snackbar.open('Une erreur est survenue', 'OK');
      }
    });
  }

  resetBar() {
    this.progressBarService.resetBar();
  }

  mettreEnPause(callback: () => any) {
    console.log("partie mise en pause");
    const idPartie = this.partieService.getPartie()?.id;
    this.webservice.SendToType("mettreEnPause", { idPartie });
    this.webservice.removeAllSubscriptionsOfType('reponseLancerActivite');
    this.webservice.removeAllSubscriptionsOfType('notificationReponseActivite');
    this.webservice.removeAllSubscriptionsOfType('reponseTerminerExplication');
    this.webservice.removeAllSubscriptionsOfType('reponseMettreEnPausePartie');
    this.webservice.removeAllSubscriptionsOfType('notificationSoumettreReponse');
    this.webservice.removeAllSubscriptionsOfType('reponseChoisirPlateau');
    this.webservice.removeAllSubscriptionsOfType('reponseListerParties');
    this.webservice.removeAllSubscriptionsOfType('reponseListerPlateaux');
    this.webservice.removeAllSubscriptionsOfType('reponseListerPlateauxPartie');
    this.webservice.removeAllSubscriptionsOfType('notificationSoumettreScoreMinijeu');
    this.webservice.removeAllSubscriptionsOfType('reponseCreerPartie');
    this.webservice.removeAllSubscriptionsOfType('reponseTerminerPartie');
    this.webservice.removeAllSubscriptionsOfType('reponseTerminerMinijeu');
    this.webservice.removeAllSubscriptionsOfType('reponseListerEquipes');
    this.webservice.removeAllSubscriptionsOfType('reponseDemarrerPartie');
    
    this.webservice.subscribeToType(
      'reponseMettreEnPausePartie',
      (message): any => {
        if (message.succes) {
          console.log("service deco");
          this.partieService.removePartie();
          callback();
        } else {
          console.log(message.messageErreur);
          this.snackbar.open('Une erreur est survenue', 'OK');
        }
      }
    );
  }

  getEquipe() {
    this.equipeService.getIdEquipe();
  }

  envoyerTerminerExplication() {
    const idPartie = this.partieService.getPartie()?.id;
    this.webservice.SendToType("terminerExplication", { idPartie });
  }

  isPlayer(): boolean {
    return this.accessSessionService.getUserAccessed();
  }

  isHost(): boolean {
    return this.connexionService.getUserAuthentication();
  }
}