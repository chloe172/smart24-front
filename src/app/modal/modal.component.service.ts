import { Injectable } from '@angular/core';
import { WebSocketService } from '../core/WebSocketService/web-socket.service';

@Injectable({
    providedIn: 'root'
})
export class ModalService {
   

    constructor(private webservice : WebSocketService) {         
        this.getIdPartie()
    }


    getIdPartie() { 
    }  
}