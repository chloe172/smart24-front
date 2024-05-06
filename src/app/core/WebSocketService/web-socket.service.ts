import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket?: WebSocket;

  private callbacks: { [type: string]: ((message: any) => any)[] } = {};

  constructor(private router: Router) {
    this.restartWebSocket();
  }

  restartWebSocket() {
    if (this.socket && this.socket.CLOSED) {
      this.socket.close();
    }
    this.socket = new WebSocket(environment.webSocketUrl);
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (this.callbacks[message.type]) {
        this.callbacks[message.type].forEach((callback) => {
          callback(message);
        });
      }
    };
    if (localStorage.getItem('tokensession') == null) {
      this.askToken();
    } else {
      let asking = false;
      let token = localStorage.getItem('tokensession');
      this.SendToType('token', { asking, token });
      this.subscribeToType('reponseToken', (message): any => {
        if (!message.succes) {
          this.askToken();
        } else {
          let role = message.data.role;
          localStorage.setItem('type', role);
          if (role === 'MAITRE_DU_JEU') {
            this.router.navigate(['/ongoing-games']);
          } else {
            this.router.navigate(['/']);
          }
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
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      setTimeout(() => {
        this.SendToType(type, data);
      }, 100);
      return;
    }
    this.socket.send(
      JSON.stringify({
        type: type,
        data: data,
      })
    );
  }

  askToken() {
    let asking = true;
    this.SendToType('token', { asking });
    this.subscribeToType('reponseToken', (message): any => {
      if (message.succes) {
        localStorage.setItem('tokensession', message.data.token);
      }
    });
  }
}
