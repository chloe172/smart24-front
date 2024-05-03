import { Component, Inject, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ResponseComponent } from '../response/response.component';
import { Proposition } from '../modele/proposition.model';
import { Question } from '../modele/question.model';
import { Equipe } from '../modele/equipe.model';
import { QuestionPageService } from './question-page.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { WebSocketService } from '../core/WebSocketService/web-socket.service';
import { IdPartieService } from '../general-services/id-partie.service';
import { TeamEnrollService } from '../team-enroll/team-enroll.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef  } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ModalScoreComponent } from '../modal-score/modal-score.component';

@Component({
  selector: 'app-question-page',
  standalone: true,
  imports: [NgFor, ResponseComponent, NgIf, MatCardModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './question-page.component.html',
  styleUrl: './question-page.component.scss'
})
export class QuestionPageComponent implements OnInit {
  question!: Question;
  propositions: Proposition[] = [];
  propositionSelectionnee: Proposition | null = null;
  idActiviteEnCours!: number;
  idBonneProposition!: number;
  equipes: Equipe[] = [];

  constructor(
    private webservice: WebSocketService,
    protected service: QuestionPageService,
    private equipeService: TeamEnrollService,
    private partieService: IdPartieService,
    private router: Router,
    public dialog: MatDialog
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
        this.service.explication = question.explication ?? "";
        this.equipes = message.data.listeEquipes;
        this.service.etape = "explication";
        this.openDialog();
    },
      (message: any) => {
        console.log("json reçu", message);
        const question = message.data.question;
        this.idBonneProposition = question.bonneProposition.id;
        this.service.explication = question.explication ?? "";
        this.equipes = [this.equipeService.idEquipe];
        this.service.etape = "explication";
        this.openDialog();
    },
    (message: any) => {
      console.log("json reçu", message);
      this.equipes = message.data.listeEquipes;
      this.service.etape = "explication";
      this.openDialog();
    });

    //TODO : header pour indiquer : le monde, l'avancement, le score des joueurs...
  }

  onSelectionReponse = (proposition: Proposition) => {
    this.propositionSelectionnee = proposition;
    this.service.etape = "select";

    let idEquipe = this.equipeService.getIdEquipe();
    let idPartie = this.partieService.getId();
    let idActiviteEnCours = this.idActiviteEnCours;

    this.webservice.SendToType("soumettreReponse", {
      idPartie,
      "idProposition": proposition.id,
      idEquipe,
      idActiviteEnCours
    });

    this.webservice.removeAllSubscriptionsOfType('reponseSoumettreReponse');
    this.webservice.subscribeToType('reponseSoumettreReponse', (message: any): any => {
      console.log("Question soumise", message);
      if (!message.succes) {
        if (message.codeErreur === 422) {
          console.log("Réponse déjà soumise");
          // TODO : afficher l'erreur
        }
      }
    });
  }

  activiteSuivante() {
    console.log("activite suivante");
    const idPartie = this.partieService.idPartie;
    this.service.explication = "";
    this.webservice.SendToType("terminerExplication", { idPartie });
  }

  mettreEnPause() {
    console.log("partie mise en pause");
    const idPartie = this.partieService.idPartie;
    this.webservice.SendToType("mettreEnPause", { idPartie });
    this.router.navigate(['/ongoing-games']);
    this.service.explication = "";
    this.service.etape = "click";
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalScoreComponent, {
      data: this.equipes,
      width: '70%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}