import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ResponseComponent } from '../response/response.component';
import { Proposition } from '../modele/proposition.model';
import { Question } from '../modele/question.model';
import { Equipe } from '../modele/equipe.model';
import { QuestionPageService } from './question-page.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ModalScoreComponent } from '../modal-score/modal-score.component';
import { Badge, Classement } from '../modele/plateau.model';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { ModalBadgeComponent } from '../modal-badge/modal-badge.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CyberGameComponent } from '../minijeux/cyber-game/cyber-game.component';
import { PopupCyberComponent } from '../minijeux/popup-cyber/popup-cyber.component';
import { GestionProjetComponent } from '../minijeux/gestion-projet/gestion-projet.component';
import { GreenITComponent } from "../minijeux/green-it/green-it.component";
import { GraphMJComponent } from '../minijeux/graph-mj/graph-mj.component';
import { IAGameComponent } from '../minijeux/iagame/iagame.component';

@Component({
    selector: 'app-question-page',
    standalone: true,
    templateUrl: './question-page.component.html',
    styleUrl: './question-page.component.scss',
    imports: [NgFor, ResponseComponent, NgIf, MatCardModule, MatButtonModule, MatIconModule, ProgressBarComponent, MatDialogModule,
        ModalScoreComponent, CyberGameComponent, PopupCyberComponent, GestionProjetComponent, GreenITComponent, IAGameComponent, GraphMJComponent]
})
export class QuestionPageComponent implements OnInit {
  question: Question = {
    intitule: '',
    id: 0,
    temps: 0,
    score: 0,
    bonneProposition: undefined,
    plateau: undefined,
    numeroActivite: 0,
    difficulteActivite: '',
  };
  propositions: Proposition[] = [];
  propositionSelectionnee: Proposition | null = null;
  idActiviteEnCours!: number;
  idBonneProposition!: number;
  nomPlateau: string = '';
  equipes: Equipe[] = [];
  badges: Badge[] = [];
  classement!: Classement;
  equipe!: Equipe;
  showProgressBar: boolean = false;
  typeActivite: string = "question";
  codeMinijeu: string = "";
  equipesFinMinijeu: Equipe[] = [];
  messagePhishing: boolean = false;

  constructor(
    protected service: QuestionPageService,
    private router: Router,
    public dialog: MatDialog,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.service.InitQuestionPage(
      (message: any) => {
        console.log("json reçu", message);
        if (message.succes) {
          this.idActiviteEnCours = message.data.idActiviteEnCours;
          this.typeActivite = message.data.typeActivite;
          if (this.typeActivite === "question") {
            this.propositions = message.data.question.listePropositions as Proposition[];
            this.question = message.data.question;
            this.idActiviteEnCours = message.data.idActiviteEnCours;
            this.service.resetBar();
            this.showProgressBar = true;
          } else if (this.typeActivite === "minijeu") {
            this.equipesFinMinijeu = [];
            this.codeMinijeu = message.data.minijeu.code;
            this.service.etape = "click";
            this.messagePhishing = false;
            this.showProgressBar = false;
          }
        } else {
          console.log(message.messageErreur);
          this.router.navigate(['/ongoing-games']);
          this.snackbar.open('Une erreur est survenue', 'OK');
        }
      },
      (message: any) => {
        console.log("json reçu", message);
        this.typeActivite = message.data.typeActivite;
        if (this.typeActivite === "question") {
          const question = message.data.question;
          this.idBonneProposition = question.bonneProposition.id;
          this.service.explication = question.explication ?? "";
        }
        this.equipes = message.data.listeEquipes;
        this.service.etape = 'explication';
        this.showProgressBar = false;
        this.nomPlateau = message.data.nomPlateauCourant;
        this.openDialogMaitreDuJeu();
      },
      (message: any) => {
        console.log("json reçu", message);
        this.typeActivite = message.data.typeActivite;
        if (this.typeActivite === "question") {
          const question = message.data.question;
          this.idBonneProposition = question.bonneProposition.id;
          this.service.explication = question.explication ?? "";
          this.equipes = message.data.listeEquipes;
          this.showProgressBar = false;
          this.service.etape = "explication";
        }
      },
      (message: any) => {
        console.log("json reçu", message);
        this.badges = message.data.equipe.badges;
        this.equipes = [message.data.equipe];
        this.classement = { badges: this.badges, equipes: this.equipes };
        this.service.etape = "explication";
        this.typeActivite = "";
        this.openDialogEquipe();
      },
      (message: any) => {
        console.log("json reçu", message);
        this.equipes = message.data.listeEquipes;
        this.service.etape = "explication";
        this.nomPlateau = message.data.partie.nomPlateauCourant;
        this.openDialogMaitreDuJeu();
      },
      (message: any) => {
        console.log("json reçu", message);
        this.equipesFinMinijeu.push(message.data.equipe);
        this.service.etape = "explication";
      });
  }

  onSelectionReponse = (proposition: Proposition) => {
    this.service.etape = 'select';
    this.propositionSelectionnee = proposition;
    this.service.envoyerReponse(proposition.id, this.idActiviteEnCours);
    this.service.recevoirSoumettreReponse();
  };

  activiteSuivante() {
    console.log('activite suivante');
    this.service.envoyerTerminerExplication();
  }

  mettreEnPause() {
    console.log('partie mise en pause');
    this.service.mettreEnPause(() => {
      this.service.explication = '';
      this.service.etape = 'click';
      this.router.navigate(['/ongoing-games']);
    });
  }

  openDialogMaitreDuJeu(): void {
    const dialogRef = this.dialog.open(ModalScoreComponent, {
      data: { equipes: this.equipes, nomPlateau: this.nomPlateau },
      width: '70%', 
      height:'80%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  openDialogEquipe(): void {
    const dialogRef = this.dialog.open(ModalBadgeComponent, {
      data: { "equipes": this.equipes, "badges": this.badges },
      width: '70%',
      height:'80%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  receiveScore($event: any) {
    console.log("score mj recu : ", $event)
    this.service.sendScoreMinijeu($event, this.idActiviteEnCours);
    if (this.codeMinijeu === "phishing") {
      this.messagePhishing = true;
    }
    this.typeActivite = "finMinijeu";
  }

  isPlayer(): boolean {
    return this.service.isPlayer();
  }

  isHost(): boolean {
    return this.service.isHost();
  }

  terminerMinijeu() {
    this.service.envoyerTerminerMinijeu();
  }

  getAvatarPath(avatar: string): string {
    return "../assets/Avatar-pikisuperstar/"+avatar+".svg";
  }
}
