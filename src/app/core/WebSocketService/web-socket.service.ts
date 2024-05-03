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
  }


  subscribeToType(type: string, callback: (message: any) => any) {
    if (!this.callbacks[type]) {
      this.callbacks[type] = [];
    }
    this.callbacks[type].push(callback);
  }

  SendToType(type: string, data: any) {
    this.socket.send(
      JSON.stringify({
        type: type,
        data : data
      })
    );
  }

  


  
}
