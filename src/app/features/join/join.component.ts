import { Component } from '@angular/core';
import { WebSocketService } from '../../core/WebSocketService/web-socket.service';

@Component({
  selector: 'app-join',
  standalone: true,
  imports: [],
  templateUrl: './join.component.html',
  styleUrl: './join.component.scss'
})
export class JoinComponent {
  question: string = '';

  constructor(
    private webSocketService: WebSocketService
  ) {
    this.webSocketService.subscribeToQuestions((question) => {
      this.question = question;
    });
  }

  uploadAnswer(answer: string) {
    console.log(answer);
    this.webSocketService.sendAnswer(answer);
  }
}
