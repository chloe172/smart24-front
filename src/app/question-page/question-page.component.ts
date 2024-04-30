import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { ResponseComponent } from '../response/response.component';

@Component({
  selector: 'app-question-page',
  standalone: true,
  imports: [NgFor, ResponseComponent],
  templateUrl: './question-page.component.html',
  styleUrl: './question-page.component.scss'
})
export class QuestionPageComponent {
  question: string = "Comment faire un css du tonnerre ?";
  responses: string[] = ["Faut suivre la méthodo", "Faut tester inch ça marche", "Faut demander à ChatGPT", "Jsp malheureusement"];

  //TODO : header pour indiquer : le monde, l'avancement, le score des joueurs...
}
