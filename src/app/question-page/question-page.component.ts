import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ResponseComponent } from '../response/response.component';
import { Proposition } from '../modele/proposition.model';
import { Question } from '../modele/question.model';
import { QuestionPageService } from './question-page.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { WebSocketService } from '../core/WebSocketService/web-socket.service';
import { IdPartieService } from '../general-services/id-partie.service';

@Component({
  selector: 'app-question-page',
  standalone: true,
  imports: [NgFor, ResponseComponent, NgIf, MatCardModule],
  templateUrl: './question-page.component.html',
  styleUrl: './question-page.component.scss'
})
export class QuestionPageComponent implements OnInit {
  router: Router = new Router;
  question!: Question;
  explication: string = "";
  propositions: Proposition[] = [];
  idActiviteEnCours!: number;
  idBonneProposition!: number;

  constructor(
    private webservice: WebSocketService,
    private service: QuestionPageService,
    private partieService: IdPartieService
  ) {
  }

  ngOnInit() {
    this.service.InitQuestionPage((message: any) => {
      console.log("json reçu", message);
      if (!message.succes) {
        console.log(message.messageErreur);
        this.router.navigate(['/error', message.codeErreur, message.messageErreur]);
      } else {
        this.propositions = message.data.question.listePropositions as Proposition[];
        this.question = message.data.question;
        this.idActiviteEnCours = message.data.idActiviteEnCours;
      }
    },
      (message: any) => {
        console.log("json reçu", message);
        const question = message.data.question;
        this.idBonneProposition = question.bonneProposition.id;
        this.explication = question.explication ?? "";
      });

    //TODO : header pour indiquer : le monde, l'avancement, le score des joueurs...
  }

  activiteSuivante() {
    console.log("activite suivante");
    const idPartie = this.partieService.idPartie;
    this.webservice.SendToType("terminerExplication", { idPartie });
    this.webservice.subscribeToType("reponseTerminerExplication", (message) => {
      console.log("json reçu", message);
      if (message.succes) {
        const partie = message.data.partie;
        if (partie.finPlateau) {
            // TODO : aller à la page de choix de plateau
        } else {
            // TODO : aller à la page de question suivante
            // Lancer activité ?
            this.webservice.SendToType("lancerActivite", { idPartie });
            this.explication = "";
        }
      } else {
        console.log(message.messageErreur);
        this.router.navigate(['/error', message.codeErreur, message.messageErreur]);
      }
    });
  }
}
