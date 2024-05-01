import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private socket: WebSocket;

  constructor() {
    this.socket = new WebSocket(environment.webSocketUrl);
  }

  sendQuestion(question: string) {
    this.socket.send(
      JSON.stringify({
        type: "question",
        question
      })
    );
  }

  subscribeToType(type: string, callback: (message: any) => any) {
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === type) {
        callback(message);
      }
    }
  }

  SendToType(type: string, data: any) {
    this.socket.send(
      JSON.stringify({
        type: type,
        data : data
      })
    );
  }

  subscribeToQuestions(callback: (question: string) => void) {
    // wait for the connection to be established
    setTimeout(() => {
      this.socket.send(
        JSON.stringify({
          type: "register",
          role: "team"
        })
      );
    }, 1000);
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'question') {
        callback(message.question);
      }
    }
  }

  sendAnswer(answer: string) {
    this.socket.send(
      JSON.stringify({
        type: "answer",
        answer
      })
    );
  }

  subscribeToAnswers(callback: (answer: string) => void) {
    // wait for the connection to be established
    setTimeout(() => {
      this.socket.send(
        JSON.stringify({
          type: "register",
          role: "host"
        })
      );
    }, 1000);
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'answer') {
        callback(message.answer);
      }
    }
  }
}
