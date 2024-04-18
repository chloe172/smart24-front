import { Component, ElementRef, ViewChild } from '@angular/core';
import { WebSocketService } from '../../core/WebSocketService/web-socket.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-host',
  standalone: true,
  imports: [
    NgFor
  ],
  templateUrl: './host.component.html',
  styleUrl: './host.component.scss'
})
export class HostComponent {
  @ViewChild('questionInput') questionInput!: ElementRef;

  answers: string[] = [];

  constructor(
    private webSocketService: WebSocketService
  ) {
    this.webSocketService.subscribeToAnswers((answer) => {
      console.log(answer);
      this.answers.push(answer);
    });
  }

  uploadQuestion(question: string) {
    console.log(question);
    this.webSocketService.sendQuestion(question);
    this.answers = [];
  }

}
