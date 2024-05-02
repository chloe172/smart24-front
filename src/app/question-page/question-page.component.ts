import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { ResponseComponent } from '../response/response.component';
import { Proposition } from '../modele/proposition.model';
import { Question } from '../modele/question.model';
import { QuestionPageService } from './question-page.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-page',
  standalone: true,
  imports: [NgFor, ResponseComponent],
  templateUrl: './question-page.component.html',
  styleUrl: './question-page.component.scss'
})
export class QuestionPageComponent implements OnInit{
  question!: Question;
  propositions: Proposition[] = [];
  router : Router = new Router;

  constructor(private service : QuestionPageService) { }
  ngOnInit(){
    this.service.InitQuestionPage((message) => {
       console.log("json reçu",message);
       if(!message.succes){
          console.log(message.messageErreur);
          this.router.navigate(['/error', message.codeErreur, message.messageErreur]);
       }else{
          this.propositions = message.data.listePropositions as Proposition[];
          this.question = message.data.intitule;
       }
    });

  //TODO : header pour indiquer : le monde, l'avancement, le score des joueurs...
}
}
