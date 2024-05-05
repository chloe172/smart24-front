import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private socket: WebSocket;

  private callbacks: { [type: string]: ((message: any) => any)[] } = {};

  constructor() {
    this.socket = new WebSocket(environment.webSocketUrl);
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (this.callbacks[message.type]) {
        this.callbacks[message.type].forEach(callback => {
          callback(message);
        });
      }
    };
    if (localStorage.getItem("tokensession") == null) {
      this.askToken();
    } else {
      let asking = false;
      let token = localStorage.getItem("tokensession");
      this.SendToType("token", { asking, token });
      this.subscribeToType("reponseToken", (message): any => {
        if (!message.succes) {
          this.askToken();
        }
      });
    }
  }

  subscribeToType(type: string, callback: (message: any) => any) {
    if (!this.callbacks[type]) {
      this.callbacks[type] = [];
    }
    this.callbacks[type].push(callback);
  }

  removeAllSubscriptionsOfType(type: string) {
    this.callbacks[type] = [];
  }

  SendToType(type: string, data: any) {
    if (this.socket.readyState !== WebSocket.OPEN) {
      setTimeout(() => {
        this.SendToType(type, data);
      }, 100);
      return;
    }
    this.socket.send(
      JSON.stringify({
        type: type,
        data: data
      })
    );
  }

  askToken() {
    let asking = true;
    this.SendToType("token", { asking });
    this.subscribeToType("reponseToken", (message): any => {
      if (message.succes) {
        localStorage.setItem("tokensession", message.data.token);
      }
    });
  }



}
