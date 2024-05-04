import { Component, Inject, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ResponseComponent } from '../response/response.component';
import { Proposition } from '../modele/proposition.model';
import { Question } from '../modele/question.model';
import { Equipe } from '../modele/equipe.model';
import { QuestionPageService } from './question-page.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef  } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ModalScoreComponent } from '../modal-score/modal-score.component';
import { Badge, Classement } from '../modele/plateau.model';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { ModalBadgeComponent } from '../modal-badge/modal-badge.component';


@Component({
  selector: 'app-question-page',
  standalone: true,
  imports: [NgFor, ResponseComponent, NgIf, MatCardModule, MatButtonModule, MatIconModule,ProgressBarComponent, MatDialogModule],
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
  badges: Badge[] = [];
  classement!: Classement;  showProgressBar: boolean = false;
  typeActivite : string = "question";

  constructor(
    protected service: QuestionPageService,
    private router : Router,
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
        this.typeActivite = message.data.typeActivite;
        if(this.typeActivite === "question"){
          this.propositions = message.data.question.listePropositions as Proposition[];
          this.question = message.data.question;
          this.idActiviteEnCours = message.data.idActiviteEnCours;
          this.service.resetBar();
          this.showProgressBar = true;
        }
      }
    },
      (message: any) => {
        console.log("json reçu", message);
        const question = message.data.question;
        this.idBonneProposition = question.bonneProposition.id;
        this.service.explication = question.explication ?? "";
        this.equipes = message.data.listeEquipes;
        this.service.etape = "explication";
        this.showProgressBar = false;
        this.openDialogMaitreDuJeu();
    },
      (message: any) => {
        console.log("json reçu", message);
        const question = message.data.question;
        this.idBonneProposition = question.bonneProposition.id;
        this.service.explication = question.explication ?? "";
        this.equipes = message.data.listeEquipes;
        this.showProgressBar = false;
        this.service.etape = "explication";
    },
    (message: any) => {
      console.log("json reçu", message);
      this.badges = message.data.equipe.badges;
      this.equipes = [message.data.equipe];
      this.classement = {badges: this.badges, equipes: this.equipes};
      this.service.etape = "explication";
      this.openDialogEquipe();
    }, 
    (message: any) => {
      console.log("json reçu", message);
      this.equipes = message.data.listeEquipes;
      this.service.etape = "explication";
      this.openDialogMaitreDuJeu();
  });

    //TODO : header pour indiquer : le monde, l'avancement, le score des joueurs...
  }

  onSelectionReponse = (proposition: Proposition) => {
    this.service.etape = "select";
    this.propositionSelectionnee = proposition;
    this.service.envoyerReponse(proposition.id, this.idActiviteEnCours);
    this.service.recevoirSoumettreReponse();
  }

  activiteSuivante() {
    console.log("activite suivante");
    this.service.envoyerTerminerExplication();
  }

  mettreEnPause() {
    console.log("partie mise en pause");
    this.service.mettreEnPause(() => {
    this.service.explication = "";
    this.service.etape = "click";
    this.router.navigate(['/ongoing-games']);
    });
  }

  openDialogMaitreDuJeu(): void {
    const dialogRef = this.dialog.open(ModalScoreComponent, {
      data: this.equipes,
      width: '70%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogEquipe(): void {
    const dialogRef = this.dialog.open(ModalBadgeComponent, {
      data: {"equipes": this.equipes, "badges": this.badges},
      width: '70%',
      height: '85%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}