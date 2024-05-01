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

  


  
}
