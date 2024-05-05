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
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ModalScoreComponent } from '../modal-score/modal-score.component';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { CyberGameComponent } from '../minijeux/cyber-game/cyber-game.component';
import { PopupCyberComponent } from '../minijeux/popup-cyber/popup-cyber.component';

@Component({
  selector: 'app-question-page',
  standalone: true,
  imports: [NgFor, ResponseComponent, NgIf, MatCardModule, MatButtonModule, MatIconModule,ProgressBarComponent, MatDialogModule, 
    ModalScoreComponent,CyberGameComponent,PopupCyberComponent],
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
  equipe!: Equipe;
  showProgressBar: boolean = false;
  typeActivite : string = "question";
  codeMinijeu : string = "";
  equipesFinMinijeu: Equipe[] = [];

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
        this.idActiviteEnCours = message.data.idActiviteEnCours;
        this.typeActivite = message.data.typeActivite;
        if(this.typeActivite === "question"){
          this.propositions = message.data.question.listePropositions as Proposition[];
          this.question = message.data.question;
          this.service.resetBar();
          this.showProgressBar = true;
        }
        else if(this.typeActivite === "minijeu"){
          this.equipesFinMinijeu = [];
          this.codeMinijeu = message.data.minijeu.code;
          this.service.etape = "click";
          this.showProgressBar = false;
        }
      }
    },
      (message: any) => {
        console.log("json reçu", message);
        this.typeActivite = message.data.typeActivite;
        if(this.typeActivite === "question"){
          const question = message.data.question;
          this.idBonneProposition = question.bonneProposition.id;
          this.service.explication = question.explication ?? "";
          this.service.etape = "explication";
          this.showProgressBar = false;
        }
        this.equipes = message.data.listeEquipes;
        this.openDialogMaitreDuJeu();
    },
      (message: any) => {
        console.log("json reçu", message);
        if(this.typeActivite === "question"){
          const question = message.data.question;
          this.idBonneProposition = question.bonneProposition.id;
          this.service.explication = question.explication ?? "";
          this.showProgressBar = false;
          this.service.etape = "explication";
        }
        this.equipe = message.data.equipe;
    },
    (message: any) => {
      console.log("json reçu", message);
      this.equipes = message.data.listeEquipes;
      this.service.etape = "explication";
      this.openDialogMaitreDuJeu();
    },
    (message: any) => {
      console.log("json reçu", message);
      this.equipesFinMinijeu.push(message.data.equipe);
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
    const dialogRef = this.dialog.open(ModalScoreComponent, {
      data: this.equipe,
      width: '70%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  receiveScore($event: any){
    console.log("score mj recu : ", $event)
    this.service.sendScoreMinijeu($event, this.idActiviteEnCours); 
    this.typeActivite = "explication_Mini_Jeu";
  }

  isPlayer(): boolean{
    return this.service.isPlayer();
  }

  isHost() : boolean {
    return this.service.isHost();
  }
  
  terminerMinijeu(){
    this.service.explication = "explication_Mini_Jeu";
    this.typeActivite = "explication_Mini_Jeu";
    // this.openDialogMaitreDuJeu(this.equipesFinMinijeu);
    this.service.envoyerTerminerMinijeu();
  }
}